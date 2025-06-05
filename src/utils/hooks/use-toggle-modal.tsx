import { useState } from 'react';
import { useEffect } from 'react';

export const useToggleModal = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('bodyBlock', isMenuOpen);

    return () => {
      document.body.classList.remove('bodyBlock');
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return { isMenuOpen, toggleMenu, closeMenu };
};
