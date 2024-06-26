import { Handler, Request, Response } from 'express';
import { prisma } from '..';
import { createResponse, excludeFromObject } from '../utils';
import { z } from 'zod';
import { HttpStatusCode } from 'axios';
import { getUserByIdOrUsername } from '../utils/user';
import { bid_status } from '@prisma/client';
import { getBookById, updateBook } from '../utils/book';

const getBidForBook: Handler = async (req: Request, res: Response) => {
  try {
    const { id } = getBidForBookParser.parse(req.body);
    try {
      const bids = await prisma.bid.findMany({
        where: {
          bookId: id,
        },
        include: {
          bidder: {
            select: {
              username: true,
            },
          },
        },
        // Get pending, declined, accepted bids in that order
        orderBy: {
          status: 'desc',
        },
      });
      createResponse(res, {
        data: bids,
      });
    } catch (e) {
      createResponse(res, {
        status: HttpStatusCode.InternalServerError,
        error: 'Sorry. Something went wrong',
      });
    }
  } catch (e) {
    createResponse(res, {
      status: HttpStatusCode.BadRequest,
      error: 'Bad request',
    });
  }
};

const createBidForBook: Handler = async (req: Request, res: Response) => {
  try {
    const { username, bookId, amount } = createBidForBookParser.parse(req.body);
    try {
      const bidder = await getUserByIdOrUsername({ username });
      const book = await getBookById(bookId);
      const owner = book?.owner;
      if (!bidder || !owner) {
        createResponse(res, {
          data: false,
          error: 'Error. Bidding is reserved for registered users',
        });
        return;
      }
      if (!book || book.locked || bidder.id === owner.id) {
        createResponse(res, {
          data: false,
          error: 'Error. Book is unavailable for bidding',
        });
        return;
      }

      // Check if a bid exists for the given bookId and bidderId
      const existingBid = await prisma.bid.findFirst({
        where: {
          bookId,
          bidderId: bidder?.id,
        },
      });

      let result;
      if (existingBid) {
        // Update the existing bid with the new data
        const updatedBid = await prisma.bid.update({
          where: {
            id: existingBid.id,
          },
          data: {
            amount,
          },
        });
        result = updatedBid;
      } else {
        const newBid = await prisma.bid.create({
          data: {
            bidderId: bidder?.id,
            ownerId: owner?.id,
            bookId,
            amount,
          },
        });
        result = newBid;
      }

      createResponse(res, {
        data: result,
      });
    } catch (e) {
      createResponse(res, {
        status: HttpStatusCode.InternalServerError,
        error: 'Sorry. Something went wrong',
      });
    }
  } catch (e) {
    createResponse(res, {
      status: HttpStatusCode.BadRequest,
      error: 'Bad request',
    });
  }
};

const updateBidForBook: Handler = async (req: Request, res: Response) => {
  try {
    const { id, amount } = updateBidForBookParser.parse(req.body);
    try {
      const updatedBid = await prisma.bid.update({
        where: {
          id,
        },
        data: {
          amount,
        },
      });

      createResponse(res, {
        data: updatedBid,
      });
    } catch (e) {
      createResponse(res, {
        status: HttpStatusCode.InternalServerError,
        error: 'Sorry. Something went wrong',
      });
    }
  } catch (e) {
    createResponse(res, {
      status: HttpStatusCode.BadRequest,
      error: 'Bad request',
    });
  }
};

// This endpoint is invoked when the owner of the book answers (accepts/declines) a bid
const answerBidForBook: Handler = async (req: Request, res: Response) => {
  try {
    const { id, status } = answerBidForBookParser.parse(req.body);
    try {
      let result;
      const updatedBid = await prisma.bid.update({
        where: {
          id,
        },
        data: {
          status,
        },
        select: {
          bidderId: true,
          ownerId: true,
          bookId: true,
          amount: true,
          status: true,
        },
      });
      // Note: Exclude sensitive information to keep users' privacy
      result = excludeFromObject(updatedBid, ['bidderId']);

      if (updatedBid.status === bid_status.ACCEPTED) {
        // Transfer ownership of book
        const updateBookData = {
          id: updatedBid.bookId,
          ownerId: updatedBid.bidderId,
        };
        const updatedBook = await updateBook(updateBookData);
        result = excludeFromObject(updatedBook, ['ownerId']);
      }

      createResponse(res, {
        data: result,
      });
    } catch (e) {
      createResponse(res, {
        status: HttpStatusCode.InternalServerError,
        error: 'Sorry. Something went wrong',
      });
    }
  } catch (e) {
    createResponse(res, {
      status: HttpStatusCode.BadRequest,
      error: 'Bad request',
    });
  }
};

const deleteBidForBook: Handler = async (req: Request, res: Response) => {
  try {
    const { id } = deleteBidForBookParser.parse(req.body);
    try {
      const deletedBid = await prisma.bid.delete({
        where: {
          id,
        },
      });

      createResponse(res, {
        data: true,
      });
    } catch (e) {
      createResponse(res, {
        status: HttpStatusCode.InternalServerError,
        error: 'Sorry. Something went wrong',
      });
    }
  } catch (e) {
    createResponse(res, {
      status: HttpStatusCode.BadRequest,
      error: 'Bad request',
    });
  }
};

const getBidForBookParser = z.object({
  id: z.string(),
});

const createBidForBookParser = z.object({
  username: z.string(),
  bookId: z.string(),
  amount: z.coerce.number().optional().default(0),
});

const updateBidForBookParser = z.object({
  id: z.string(),
  amount: z.coerce.number().optional().default(0),
});

const answerBidForBookParser = z.object({
  id: z.string(),
  status: z.nativeEnum(bid_status),
});

const deleteBidForBookParser = z.object({
  id: z.string(),
});

export default {
  getBidForBook,
  createBidForBook,
  updateBidForBook,
  answerBidForBook,
  deleteBidForBook,
};
