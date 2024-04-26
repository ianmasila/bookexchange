// Helper functions for user

import { prisma } from '..';

const getUserByIdOrUsername = async (input: { id?: string; username?: string }) => {
  if (!input.id && !input.username) {
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
      books: true,
      bids: true,
      sentTrades: true,
      receivedTrades: true,
    },
  });

  return user;
};

export { getUserByIdOrUsername };
