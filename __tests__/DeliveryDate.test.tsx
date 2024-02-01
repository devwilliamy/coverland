import '@testing-library/jest-dom';
import DeliveryDate from '@/components/PDP/components/DeliveryDate';
import { render, screen } from '@testing-library/react';
import * as utils from '@/lib/utils/deliveryDateUtils';

jest.mock('@/lib/utils/deliveryDateUtils');
describe('DeliveryDate renders correctly', () => {
  it('should render', () => {
    render(<DeliveryDate />);
  });
  it('should have Delivery by', () => {
    render(<DeliveryDate />);
    expect(screen.getByText('Delivery by')).toBeInTheDocument();
  });
  it('should have Delivery by [deliveryByDate]', () => {
    jest.spyOn(utils, 'determineDeliveryByDate').mockReturnValue('Jan 25');
    expect(utils.determineDeliveryByDate()).toBe('Jan 25');
    render(<DeliveryDate />);
    expect(screen.getByText('Delivery by')).toBeInTheDocument();
    expect(screen.getByText('Jan 25')).toBeInTheDocument();
  });
});
