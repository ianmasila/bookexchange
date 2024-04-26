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

const updateBook = async (data: UpdateBookInput) => {
  // Filter out fields with undefined values
  const filteredUpdateData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== undefined));
  const updatedBook = await prisma.book.update({
    where: {
      id: data.id,
    },
    data: {
      ...filteredUpdateData,
    },
  });

  return updatedBook;
};

export { updateBook };
