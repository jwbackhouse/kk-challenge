import { ActionButtons } from '../components/ActionButtons';
import { Badge } from '../components/Badge';
import { DeliveryDetails } from '../components/DeliveryDetails';
import './Welcome.css';

import image from '../assets/test.png';
import { useWelcomeMessage } from '../hooks/useGetWelcome';

export function Welcome() {
  const { data, isLoading } = useWelcomeMessage();

  if (isLoading) {
    //This would be replaced with a proper loading spinner
    // or - better - a Suspense boundary
    return <div>Loading...</div>;
  }
  return (
    <div className="welcome-container">
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
    </div>
  );
}
