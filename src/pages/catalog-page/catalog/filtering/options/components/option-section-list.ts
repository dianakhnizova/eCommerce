import { messages } from '../messages';
import { colorList, priceList, sizeList } from '../components/option-lists';
import type { Option } from './types';

export const getOptionSectionList = (): {
  title: string;
  options: Option[];
}[] => [
  // {
  //   title: messages.subCategoryTitle,
  //   options: subCategoryList,
  // },
  {
    title: messages.priceTitle,
    options: priceList,
  },
  {
    title: messages.colorTitle,
    options: colorList,
  },
  {
    title: messages.sizeTitle,
    options: sizeList,
  },
];
