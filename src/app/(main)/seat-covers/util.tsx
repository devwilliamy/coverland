import CircleBlackRed from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/black-red/seat-circle-black-red.webp';
import CircleBlack from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/black/seat-circle-black.webp';
import CircleGray from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/gray/seat-circle-gray.webp';
import CircleBeige from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/beige/seat-circle-beige.webp';

import HeaderBlackRed from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/black-red/header-seat-black-red.webp';
import HeaderBlack from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/black/header-seat-black.webp';
import HeaderGray from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/gray/header-seat-gray.webp';
import HeaderBeige from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/beige/header-seat-beige.webp';

import TouchSeatBlackRed from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/black-red/touch-seat-black-red.webp';
import TouchSeatBlack from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/black/touch-seat-black.webp';
import TouchSeatGray from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/gray/touch-seat-gray.webp';
import TouchSeatBeige from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/beige/touch-seat-beige.webp';

import CloseSeatBlackRed from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/black-red/close-seat-black-red.webp';
import CloseSeatBlack from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/black/close-seat-black.webp';
import CloseSeatGray from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/gray/close-seat-gray.webp';
import CloseSeatBeige from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/beige/close-seat-beige.webp';

import SideSeatBlackRed from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/black-red/side-seat-black-red.webp';
import SideSeatBlack from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/black/side-seat-black.webp';
import SideSeatGray from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/gray/side-seat-gray.webp';
import SideSeatBeige from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/beige/side-seat-beige.webp';

import AirbagBlackRed from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/black-red/airbag-bk-r.webp';
import AirbagBlack from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/black/airbag-bk.webp';
import AirbagGray from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/gray/airbag-gr.webp';
import AirbagBeige from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/beige/airbag-be.webp';

import DimensionsBlackRed from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/black-red/seat-dimensions-black-red.webp';
import DimensionsBlack from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/black/seat-dimensions-black.webp';
import DimensionsGray from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/gray/seat-dimensions-gray.webp';
import DimensionsBeige from '@/images/PDP/Product-Details-Redesign-2/seat-covers/cover-colors/beige/seat-dimensions-beige.webp';

import { StaticImageData } from 'next/image';

export type SeatString =
  | 'BlackRedData'
  | 'BlackData'
  | 'GrayData'
  | 'BeigeData';

export type SeatData = StaticImageData[];

const BlackRedData: SeatData = [
  CircleBlackRed,
  HeaderBlackRed,
  TouchSeatBlackRed,
  CloseSeatBlackRed,
  SideSeatBlackRed,
  AirbagBlackRed,
  DimensionsBlackRed,
];
const BlackData: SeatData = [
  CircleBlack,
  HeaderBlack,
  TouchSeatBlack,
  CloseSeatBlack,
  SideSeatBlack,
  AirbagBlack,
  DimensionsBlack,
];
const GrayData: SeatData = [
  CircleGray,
  HeaderGray,
  TouchSeatGray,
  CloseSeatGray,
  SideSeatGray,
  AirbagGray,
  DimensionsGray,
];
const BeigeData: SeatData = [
  CircleBeige,
  HeaderBeige,
  TouchSeatBeige,
  CloseSeatBeige,
  SideSeatBeige,
  AirbagBeige,
  DimensionsBeige,
];

export const SeatImageDataObject = {
  BlackRedData: BlackRedData,
  BlackData: BlackData,
  GrayData: GrayData,
  BeigeData: BeigeData,
};
