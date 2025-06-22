import { developers } from '../src/pages/about-page/about-developers/developers-list';
import { messages } from '../src/pages/about-page/about-developers/messages';

describe('developers data', () => {
  it('should contain 3 developers', () => {
    expect(developers).toHaveLength(3);
  });

  it('should include correct properties for each developer', () => {
    developers.forEach(dev => {
      expect(dev).toHaveProperty('photo');
      expect(dev).toHaveProperty('name');
      expect(dev).toHaveProperty('role');
      expect(dev).toHaveProperty('bio');
      expect(dev).toHaveProperty('gitHub');
    });
  });

  it('should match developer names from messages', () => {
    const names = developers.map(dev => dev.name);
    expect(names).toEqual([
      messages.developerName2,
      messages.developerName1,
      messages.developerName3,
    ]);
  });
});
