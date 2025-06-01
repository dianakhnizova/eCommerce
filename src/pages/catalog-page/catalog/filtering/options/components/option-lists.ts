import { messages } from './messages';

export const priceList: { id: string; label: string; checked: boolean }[] = [
  { id: 'range', label: messages.priceOptions.rangeTitle, checked: true },
  { id: 'price', label: messages.priceOptions.priceTitle, checked: false },
  {
    id: 'discount',
    label: messages.priceOptions.discountPriceTitle,
    checked: false,
  },
];

export const colorList: { id: string; label: string; checked: boolean }[] = [
  { id: 'brown', label: messages.colorOptions.brown, checked: true },
  { id: 'black', label: messages.colorOptions.black, checked: false },
  { id: 'grey', label: messages.colorOptions.grey, checked: false },
  { id: 'white', label: messages.colorOptions.white, checked: false },
  { id: 'pink', label: messages.colorOptions.pink, checked: false },
];

export const sizeList: { id: string; label: string; checked: boolean }[] = [
  { id: 'small', label: messages.sizeOptions.smallSize, checked: true },
  { id: 'medium', label: messages.sizeOptions.mediumSize, checked: false },
  { id: 'large', label: messages.sizeOptions.largeSize, checked: false },
];
