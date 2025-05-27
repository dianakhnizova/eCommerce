import { messages } from './messages';
import {
  categoryList,
  colorList,
  priceList,
  sizeList,
  subCategoryList,
} from './option-lists';

export const optionSectionList = [
  {
    title: messages.categoryTitle,
    options: categoryList,
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
