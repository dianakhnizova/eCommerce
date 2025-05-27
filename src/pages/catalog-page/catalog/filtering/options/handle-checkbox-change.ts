import { messages } from './messages';
import { catalogStore } from '../../../../../store/catalog-store';

export const handleCheckboxChange = (sectionTitle: string, id: string) => {
  switch (sectionTitle) {
    case messages.categoryTitle: {
      catalogStore.toggleCategorySelection(id);
      void catalogStore.getProducts();
      break;
    }
    case messages.priceTitle: {
      // catalogStore.togglePriceSelection(id);
      void catalogStore.getProducts();
      break;
    }
    case messages.colorTitle: {
      //catalogStore.toggleColorSelection(id);
      void catalogStore.getProducts();
      break;
    }
    case messages.sizeTitle: {
      //catalogStore.toggleSizeSelection(id);
      void catalogStore.getProducts();
      break;
    }
    default: {
      console.log(`Unknown section title: ${sectionTitle}`);
      break;
    }
  }
};
