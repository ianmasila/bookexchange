import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtUserDetails } from '../types';
import { createResponse } from '../utils';
import { HttpStatusCode } from 'axios';
import { role_type } from '@prisma/client';

export const isLoggedInMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    createResponse(res, {
      status: HttpStatusCode.Unauthorized,
      error: 'No Token provided',
    });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded as JwtUserDetails;
    next();
  } catch (e) {
    createResponse(res, {
      status: HttpStatusCode.Unauthorized,
      error: 'Invalid token',
    });
  }
};

export const isAdministratorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== role_type.ADMINISTRATOR) {
    createResponse(res, {
      status: HttpStatusCode.Forbidden,
      error: 'You are forbidden to do this',
    });
    return;
  }
  next();
};
