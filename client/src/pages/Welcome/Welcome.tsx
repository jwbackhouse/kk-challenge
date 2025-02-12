import { ActionButtons } from '../../components/ActionButtons';
import { Badge } from '../../components/Badge';
import { DeliveryDetails } from '../../components/DeliveryDetails';
import './Welcome.css';

// No image optimzation done here!
import image from '../../assets/cat.jpg';
import { useWelcomeMessage } from '../../hooks/useGetWelcome';
import { Error } from '../Error';

export function Welcome() {
  const { data, isLoading, isError } = useWelcomeMessage();

  if (isLoading) {
    //This would be replaced with a proper loading spinner
    // or - better - a Suspense boundary
    return <div>Loading...</div>;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <main className="welcome-container">
      <div className="welcome-card">
        <div className="welcome-image-container">
          <img
            src={image}
            alt={'Photo of a very happy cat'}
            className="welcome-image"
          />
        </div>
        <div className="welcome-info">
          <DeliveryDetails />
          <ActionButtons />
        </div>
      </div>
      {data?.freeGift ? <Badge /> : null}
    </main>
  );
}
