import PaymentForm from './PaymentForm';
import PaypalForm from './PaypalForm';
import VerifyForm from './VerifyForm';

export default function HeartlandPage() {
  return (
    <div>
      <VerifyForm />
      <br/>
      {/* <PaymentForm /> */}
      <PaypalForm/>
    </div>
  );
}
