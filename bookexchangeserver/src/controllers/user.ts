import { Handler, Request, Response } from 'express';
import { prisma } from '..';
import { createResponse } from '../utils';
import { z } from 'zod';
import { HttpStatusCode } from 'axios';

// Helper functions
const getUserByIdOrUsername = async (input: { id: string | undefined; username: string | undefined }) => {
  if (input.id === undefined && input.username === undefined) {
    return null;
  }
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          id: input.id,
        },
        {
          username: input.username,
        },
      ],
    },
    include: {
      userRoles: {
        include: {
          role: true,
        },
      },
    },
  });

  return user;
};

/**
 * This is using an OR operator to check if the username or email exists
 */
const getUserByIdOrUsernameHandler: Handler = async (req: Request, res: Response) => {
  try {
    const { id, username } = getUserByIdOrUsernameParser.parse(req.body);
    try {
      const user = await getUserByIdOrUsername({ id, username });
      if (user) {
        createResponse(res, {
          data: user,
        });
        return;
      }
      // If no user is found
      createResponse(res, { data: false });
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

const getUserByIdOrUsernameParser = z.object({
  id: z.coerce.string().optional(),
  username: z.coerce.string().optional(),
});

export default {
  getUserByIdOrUsernameHandler,
};
