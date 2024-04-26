import { Handler, Request, Response } from 'express';
import { prisma } from '..';
import { user, role_type } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { HttpStatusCode } from 'axios';
import { JwtUserDetails } from '../types';
import { createResponse, excludeFromObject } from '../utils';

const JWT_EXPIRY_DURATION = '1d';

const checkPassword = async (user: user, password: string) => {
  if (!user?.password) {
    return false;
  }
  return await bcrypt.compare(password, user.password);
};

// TODO: Add refresh tokens for a seamless session user experience
const createAuthJwts = (user: user, role: role_type = role_type.USER, type: 'JWT' | 'REFRESH' = 'JWT') => {
  const jwtInfo: JwtUserDetails = {
    id: user.id,
    role: role,
  };
  const token = jwt.sign(jwtInfo, process.env.JWT_SECRET!, {
    expiresIn: JWT_EXPIRY_DURATION,
  });
  return { token };
};

const login: Handler = async (req: Request, res: Response) => {
  try {
    const { username, password } = loginBodyParser.parse(req.body);
    try {
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
        include: {
          userRoles: {
            include: {
              role: true,
            },
          },
        },
      });

      let isPasswordCorrect = false;
      if (user) {
        isPasswordCorrect = await checkPassword(user, password);
      }

      if (!user || !isPasswordCorrect) {
        createResponse(res, {
          status: HttpStatusCode.Unauthorized,
          error: 'Incorrect username or password',
        });
        return;
      }

      const isAdministrator = user.userRoles.some((userRole) => userRole.role.name === role_type.ADMINISTRATOR);
      const { token } = createAuthJwts(user, isAdministrator ? role_type.ADMINISTRATOR : role_type.USER);

      const userWithoutPassword = excludeFromObject(user, ['password']);
      createResponse(res, {
        data: {
          user: userWithoutPassword,
          token,
        },
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

const register: Handler = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = registerBodyParser.parse(req.body);
    try {
      const user = await prisma.user.findFirst({
        where: {
          username,
        },
      });

      if (user) {
        createResponse(res, {
          status: HttpStatusCode.BadRequest,
          error: `'${username}' unavailable`,
        });
        return;
      }
      const foundRole = await prisma.role.findFirst({
        where: {
          name: role,
        },
      });

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          username,
          password: passwordHash,
          ...(foundRole && {
            userRoles: {
              create: [
                {
                  roleId: foundRole.id,
                },
              ],
            },
          }),
        },
        include: {
          userRoles: {
            include: {
              role: true,
            },
          },
        },
      });

      // TODO: Uncomment once session is implemented
      // const isAdministrator = newUser.userRoles.some((userRole) => userRole.role.name === role_type.ADMINISTRATOR);
      // const { token } = createAuthJwts(newUser, isAdministrator ? role_type.ADMINISTRATOR : role_type.USER);
      const userWithoutPassword = excludeFromObject(newUser, ['password']);

      createResponse(res, {
        data: { user: userWithoutPassword },
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

const registerBodyParser = z.object({
  username: z.string(),
  password: z.string(),
  role: z.nativeEnum(role_type).optional(),
});

const loginBodyParser = z.object({
  username: z.string(),
  password: z.string(),
});

export default {
  register,
  login,
};
