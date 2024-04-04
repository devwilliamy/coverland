import '@testing-library/jest-dom';
import EditVehicleModal from '@/components/edit-vehicle/EditVehicleModal';
import { render, screen } from '@testing-library/react';

// jest.mock(
//   '../public/data/parent_generation_data.json',
//   () => ({
//     /* mock data here */
//     test: 'test',
//   }),
//   { virtual: true }
// );
jest.mock('../src/components/PDP/EditVehicleDropdown.tsx', () => ({
  // __esModule: true, // This property is needed when using ES modules
  // default: () => 'MockEditVehicleModal', // Mock functional component
}));
describe.only('PartialCoverSelector should render correctly', () => {
  it('should render', () => {
    const makeParam = 'BMW';
    const modelParam = '3-series';
    const modelData = [{ make: 'BMW', model: '3-series' }];
    const fullProductName = `${makeParam ? modelData[0]?.make : 'Car Covers'} ${modelParam ? modelData[0]?.model : ''}`;

    render(<EditVehicleModal fullProductName={fullProductName} />);
    expect(screen.getByText('BMW 3-series'));
  });
  it('should render car covers in its title', () => {
    const makeParam = '';
    const modelParam = '';
    const modelData = [{ make: '', model: '' }];
    const fullProductName = `${makeParam ? modelData[0]?.make : 'Car Covers'} ${modelParam ? modelData[0]?.model : ''}`;

    render(<EditVehicleModal fullProductName={fullProductName} />);
    expect(screen.getByText('Car Covers'));
  });
});
