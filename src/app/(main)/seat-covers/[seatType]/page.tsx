import SeatCovers from '../page';
export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ seatType: 'leatherette' }, { seatType: 'Leatherette' }];
}

export default function Leatherette() {
  return <SeatCovers />;
}
