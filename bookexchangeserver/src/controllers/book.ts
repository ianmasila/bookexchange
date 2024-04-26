import { Handler, Request, Response } from 'express';
import { prisma } from '..';
import { createResponse } from '../utils';
import { z } from 'zod';
import { HttpStatusCode } from 'axios';
import { genre } from '@prisma/client';
import { getUserByIdOrUsername } from '../utils/user';
import user from './user';

/**
 * Get book based on the title
 */
const getBookByTitle = async (title: string) => {
  const books = await prisma.book.findMany({
    where: {
      title,
    },
    include: {
      owner: true,
    },
  });

  return books;
};

/**
 * Get books based on the author
 */
const getBooksByAuthor = async (author: string) => {
  const books = await prisma.book.findMany({
    where: {
      author,
    },
    include: {
      owner: true,
    },
  });

  return books;
};

/**
 * Get books based on the owner
 */
const getBooksByOwner = async (username: string) => {
  const books = await prisma.book.findMany({
    where: {
      owner: {
        username,
      },
    },
    include: {
      owner: true,
    },
  });

  return books;
};

/**
 * Get books based on a list of genres. If no genres are given, get all books.
 */
const getBooksByGenre = async (genres: genre[]) => {
  const books = await prisma.book.findMany({
    where:
      genres && genres.length > 0
        ? {
            genre: {
              hasSome: genres,
            },
          }
        : {},
    include: {
      owner: true,
    },
  });

  return books;
};

const getBookByTitleHandler: Handler = async (req: Request, res: Response) => {
  try {
    const { title } = getBookByTitleParser.parse(req.body);
    try {
      const book = await getBookByTitle(title);
      createResponse(res, {
        data: book,
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

const getBooksByAuthorHandler: Handler = async (req: Request, res: Response) => {
  try {
    const { author } = getBooksByAuthorParser.parse(req.body);
    try {
      const books = await getBooksByAuthor(author);
      createResponse(res, {
        data: books,
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

const getBooksByOwnerHandler: Handler = async (req: Request, res: Response) => {
  try {
    const { username } = getBooksByOwnerParser.parse(req.body);
    try {
      const books = await getBooksByOwner(username);
      createResponse(res, {
        data: books,
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

const getBooksByGenreHandler: Handler = async (req: Request, res: Response) => {
  try {
    const { genres } = getBooksByGenreParser.parse(req.body);
    try {
      const books = await getBooksByGenre(genres);
      createResponse(res, {
        data: books,
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

const createBook: Handler = async (req: Request, res: Response) => {
  try {
    const { username, title, author, genres, description, locked } = createBookParser.parse(req.body);
    try {
      const owner = await getUserByIdOrUsername({ username });
      const newBook = await prisma.book.create({
        data: {
          title,
          author,
          genre: genres,
          description,
          locked,
          ownerId: owner?.id,
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

const getBookByTitleParser = z.object({
  title: z.coerce.string(),
});

const getBooksByAuthorParser = z.object({
  author: z.coerce.string(),
});

const getBooksByOwnerParser = z.object({
  username: z.coerce.string(),
});

const getBooksByGenreParser = z.object({
  genres: z.array(z.nativeEnum(genre)),
});

const createBookParser = z.object({
  username: z.string(),
  title: z.string(),
  author: z.string(),
  genres: z.array(z.nativeEnum(genre)),
  description: z.string().optional(),
  locked: z.boolean().optional().default(false),
});

export default {
  getBookByTitleHandler,
  getBooksByAuthorHandler,
  getBooksByOwnerHandler,
  getBooksByGenreHandler,
  createBook,
};
