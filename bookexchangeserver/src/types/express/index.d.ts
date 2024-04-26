import { JwtUserDetails } from '..';

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: JwtUserDetails;
    }
  }
}
