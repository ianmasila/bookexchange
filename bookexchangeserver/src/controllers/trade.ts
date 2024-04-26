import { Handler, Request, Response } from 'express';
import { createResponse } from '../utils';
import { z } from 'zod';
import { HttpStatusCode } from 'axios';


//TODO: Create trades and payments for accepted bids
const completePayment: Handler = async (req: Request, res: Response) => {
  try {
    const { tradeId } = paymentParser.parse(req.body);
    try {
      const isSuccess = true;
      createResponse(res, {
        data: isSuccess,
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


const paymentParser = z.object({
  tradeId: z.string(),
});

export default {
  completePayment,
};
