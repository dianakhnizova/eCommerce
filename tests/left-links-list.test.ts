import { leftLinks } from '../src/components/header/bottom-header/left-menu/left-links-list';
import { PagePath } from '../src/router/enums';
import { messages } from '../src/components/header/bottom-header/messages';

describe('leftLinks', () => {
  it('contains correct number of links', () => {
    expect(leftLinks).toHaveLength(3);
  });

  it('contains correct link paths and labels', () => {
    expect(leftLinks).toEqual([
      {
        to: PagePath.root,
        label: messages.homeLink,
      },
      {
        to: PagePath.aboutPage,
        label: messages.aboutLink,
      },
      {
        to: PagePath.catalogPage,
        label: messages.catalogLink,
      },
    ]);
  });
});
