import { useWelcomeMessage } from '../../hooks/useGetWelcome';
import './DeliveryDetails.css';

export function DeliveryDetails() {
  const { data } = useWelcomeMessage();

  return (
    <div className="delivery-details">
      <h2 className="delivery-title">{data?.title}</h2>
      <p className="delivery-message">{data?.message}</p>
      <p className="delivery-price">Total price: £{data?.totalPrice}</p>
    </div>
  );
}
