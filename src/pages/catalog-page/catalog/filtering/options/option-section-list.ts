import { catalogStore } from '../../../../../store/catalog-store';
import { messages } from './messages';
import {
  colorList,
  priceList,
  sizeList,
  subCategoryList,
} from './option-lists';
import type { Option } from './types';

export const getOptionSectionList = (): {
  title: string;
  options: Option[];
}[] => [
  {
    title: messages.categoryTitle,
    options: catalogStore.getCategoryList(),
  },
  {
    title: messages.subCategoryTitle,
    options: subCategoryList,
  },
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
