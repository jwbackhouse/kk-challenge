import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

type WelcomeData = {
  title: string;
  message: string;
  totalPrice: string;
  freeGift: boolean;
};

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
  return response.json();
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
