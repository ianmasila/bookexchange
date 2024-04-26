import { Handler, Request, Response } from 'express';
import { createResponse } from '../utils';
import { z } from 'zod';
import { HttpStatusCode } from 'axios';
import { getUserByIdOrUsername } from '../utils/user';

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
  id: z.string().optional(),
  username: z.string().optional(),
});

export default {
  getUserByIdOrUsernameHandler,
};
