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
    const { username, password } = req.body;
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
};

const register: Handler = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = registerBodyParser.parse(req.body);
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (user) {
      createResponse(res, {
        status: HttpStatusCode.BadRequest,
        error: `${username} unavailable`,
      });
      return;
    }

    const foundRole = await prisma.role.findUnique({
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

    const isAdministrator = newUser.userRoles.some((userRole) => userRole.role.name === role_type.ADMINISTRATOR);
    const { token } = createAuthJwts(newUser, isAdministrator ? role_type.ADMINISTRATOR : role_type.USER);
    const userWithoutPassword = excludeFromObject(newUser, ['password']);

    createResponse(res, {
      data: { user: userWithoutPassword, token },
    });
  } catch (e) {
    createResponse(res, {
      status: HttpStatusCode.InternalServerError,
      error: 'Sorry. Something went wrong',
    });
  }
};

// FIXME: Typing issue with req: Request
// const verifyPassword = async (req: Request, res: Response) => {
//   try {
//     const { password } = verifyPasswordBodyParser.parse(req.body);
//     if (!req?.user?.id) {
//       createResponse(res, {
//         status: HttpStatusCode.BadRequest,
//         error: 'Something went wrong',
//       });
//       return;
//     }
//     const user = await prisma.user.findFirst({
//       where: {
//         id: req?.user?.id,
//       },
//     });
//     if (!user) {
//       createResponse(res, {
//         status: HttpStatusCode.BadRequest,
//         error: 'Something went wrong',
//       });
//       return;
//     }
//     const isPasswordCorrect = await checkPassword(user, password);
//     if (!isPasswordCorrect) {
//       createResponse(res, {
//         status: HttpStatusCode.BadRequest,
//         error: 'Incorrect password',
//       });
//       return;
//     }
//     const jwtInfo = {
//       id: user.id,
//       username: user.username,
//     };

//     // Generate a token for the user for risky actions. Currently, only for account deletion
//     const secret = process.env.DELETE_ACCOUNT_TOKEN_SECRET!
//     const token = jwt.sign(jwtInfo, secret, { expiresIn: '3m' });

//     createResponse(res, {
//       data: {
//         token,
//       },
//     });
//   } catch (e) {
//     createResponse(res, {
//       status: HttpStatusCode.BadRequest,
//       error: 'Bad Request',
//     });
//   }
// };

const registerBodyParser = z.object({
  username: z.string(),
  password: z.string(),
  role: z.nativeEnum(role_type).optional(),
});

const verifyPasswordBodyParser = z.object({
  password: z.string(),
});

export default {
  register,
  login,
};