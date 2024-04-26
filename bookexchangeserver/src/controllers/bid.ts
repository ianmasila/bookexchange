import { Handler, Request, Response } from 'express';
import { prisma } from '..';
import { createResponse } from '../utils';
import { z } from 'zod';
import { HttpStatusCode } from 'axios';
import { getUserByIdOrUsername } from '../utils/user';
import { bid_status } from '@prisma/client';
import { getBookById } from '../utils/book';

const getBidForBook: Handler = async (req: Request, res: Response) => {
  try {
    const { bookId } = getBidForBookParser.parse(req.body);
    try {
      const bids = await prisma.bid.findMany({
        where: {
          bookId,
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
      const owner = await getBookById(bookId);
      if (!bidder || !owner) {
        createResponse(res, {
          data: false,
          error: 'Error. Bidding is reserved for registered users',
        });
        return;
      }

      const newBook = await prisma.bid.create({
        data: {
          bidderId: bidder?.id,
          ownerId: owner?.id,
          bookId,
          amount,
        },
      });

      createResponse(res, {
        data: newBook,
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
    const data = updateBidForBookParser.parse(req.body);
    try {
      const updatedBid = await prisma.bid.update({
        where: {
          id: data.id,
        },
        data: {
          amount: data?.amount,
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

// This endpoint is invoked when the owner of the book declines a bid
const declineBidForBook: Handler = async (req: Request, res: Response) => {
  try {
    const { id } = declineBidForBookParser.parse(req.body);
    try {
      const updatedBid = await prisma.bid.update({
        where: {
          id,
        },
        data: {
          status: bid_status.DECLINED,
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
        data: deletedBid,
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
  bookId: z.string(),
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

const declineBidForBookParser = z.object({
  id: z.string(),
});

const deleteBidForBookParser = z.object({
  id: z.string(),
});

export default {
  getBidForBook,
  createBidForBook,
  updateBidForBook,
  declineBidForBook,
  deleteBidForBook,
};
