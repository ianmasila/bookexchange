// Helper functions for book
import { prisma } from '..';

interface UpdateBookInput {
  id: string;
  ownerId?: string;
  title?: string;
  author?: string;
  genre?: string[];
  description?: string;
  photoUrl?: string;
  locked?: boolean;
}

const getBookById = async (id: string) => {
  const book = await prisma.book.findFirst({
    where: {
      id,
    },
    include: {
      owner: true,
    },
  });

  return book;
};

const updateBook = async (data: UpdateBookInput) => {
  // Filter out fields with undefined values
  const filteredUpdateData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== undefined));
  const updatedBook = await prisma.book.update({
    where: {
      id: data.id,
      deletedAt: null,
    },
    data: {
      ...filteredUpdateData,
    },
  });

  return updatedBook;
};

export { getBookById, updateBook };
