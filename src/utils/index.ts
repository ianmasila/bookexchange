import { Response } from 'express';
import { ResponseHandler } from '../types';

export const createResponse = (res: Response, responseParams: ResponseHandler): void => {
  const { status, data: responseData, error } = responseParams;
  res.status(status || 200).json({ data: responseData, error: error || null });
};

export const excludeFromObject = <T, Key extends keyof T>(t: T, keys: Key[]): Omit<T, Key> => {
  for (let key of keys) {
    delete t[key];
  }
  return t;
};
