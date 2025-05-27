import { messages } from './messages';

export const subCategoryList: {
  id: string;
  label: string;
  checked: boolean;
}[] = [
  { id: 'bear', label: messages.subCategoryOptions.bearTitle, checked: true },
  {
    id: 'rabbit',
    label: messages.subCategoryOptions.rabbitTitle,
    checked: true,
  },
  { id: 'cat', label: messages.subCategoryOptions.catTitle, checked: true },
  { id: 'dog', label: messages.subCategoryOptions.dogTitle, checked: true },
  { id: 'duck', label: messages.subCategoryOptions.duckTitle, checked: true },
  { id: 'fish', label: messages.subCategoryOptions.fishTitle, checked: true },
  {
    id: 'barbie',
    label: messages.subCategoryOptions.barbieTitle,
    checked: true,
  },
  {
    id: 'knitting-dolls',
    label: messages.subCategoryOptions.knittingDolsTitle,
    checked: true,
  },
  {
    id: 'tractor',
    label: messages.subCategoryOptions.tractorTitle,
    checked: true,
  },
  {
    id: 'airplane',
    label: messages.subCategoryOptions.airplaneTitle,
    checked: true,
  },
];

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
