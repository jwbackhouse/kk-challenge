import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

// Ideally this type would be shared with the backend via
// OpenAPI / ts-rest / similar
const welcomeDataSchema = z.object({
  title: z.string(),
  message: z.string(),
  totalPrice: z.string(),
  freeGift: z.boolean(),
});
type WelcomeData = z.infer<typeof welcomeDataSchema>;

type WelcomeError = {
  message: string;
  status: number;
};

const fetchWelcomeMessage = async (userId?: string): Promise<WelcomeData> => {
  const response = await fetch(
    `http://localhost:3000/comms/your-next-delivery/${userId}`,
  );

  if (!response.ok) {
    const error: WelcomeError = {
      message: 'Failed to fetch data',
      status: response.status,
    };
    throw error;
  }

  const data = await response.json();
  if (!welcomeDataSchema.safeParse(data).success) {
    throw new Error('Invalid data');
  }

  return data;
};

export const useWelcomeMessage = () => {
  const { userId } = useParams();

  return useQuery<WelcomeData, WelcomeError>({
    queryKey: ['welcomeMessage', userId],
    queryFn: () => fetchWelcomeMessage(userId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!userId,
  });
};
