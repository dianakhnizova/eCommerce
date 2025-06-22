import { render, screen } from '@testing-library/react';
import { messages } from '../src/pages/about-page/about-developers/messages';
import { developers } from '../src/pages/about-page/about-developers/developers-list';
import { AboutDevelopers } from '../src/pages/about-page/about-developers/about-developers';

describe('AboutDevelopers', () => {
  it('renders the title', () => {
    render(<AboutDevelopers />);
    expect(screen.getByText(messages.titleDevelopers)).toBeInTheDocument();
  });

  it('renders all developer names and roles', () => {
    render(<AboutDevelopers />);

    developers.forEach(dev => {
      expect(screen.getByText(dev.name)).toBeInTheDocument();
    });

    const roles = developers.map(dev => dev.role);
    const uniqueRoles = new Set(roles);

    for (const role of uniqueRoles) {
      const count = roles.filter(r => r === role).length;
      const found = screen.getAllByText(role);
      expect(found).toHaveLength(count);
    }
  });

  it('renders all GitHub links', () => {
    render(<AboutDevelopers />);

    developers.forEach(dev => {
      const link = screen.getByRole('link', { name: dev.gitHub });
      expect(link).toHaveAttribute('href', dev.gitHub);
    });
  });

  it('renders each developer bio as paragraphs', () => {
    render(<AboutDevelopers />);

    const bios = [
      messages.developerBio1,
      messages.developerBio2,
      messages.developerBio3,
    ];

    bios.forEach(bio => {
      bio.split('\n\n').forEach(paragraph => {
        expect(
          screen.getByText(content => content.includes(paragraph.trim()))
        ).toBeInTheDocument();
      });
    });
  });
});
