import { DefaultArgs } from '@prisma/client/runtime/library';
import { Prisma, PrismaClient, role_type } from '@prisma/client';

export interface JwtUserDetails {
  id: string;
  role: role_type;
}

export interface ResponseHandler {
  status?: number;
  message?: string;
  data?: any;
  error?: any;
}

export type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export type PrismaTransaction = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;
