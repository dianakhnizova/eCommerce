import { messages } from './messages';
import type { DevelopersType } from './types';
import Diana from '../../../../assets/developers-photos/diana.jpg';
import Nastya from '../../../../assets/developers-photos/nastya.jpg';
import Aizhan from '../../../../assets/developers-photos/aizhan.jpg';

const developers: DevelopersType[] = [
  {
    photo: Diana,
    name: messages.developerName1,
    role: messages.developerRole1,
    bio: messages.developerBio1,
    gitHub: messages.developerGitHub1,
  },
  {
    photo: Nastya,
    name: messages.developerName2,
    role: messages.developerRole2,
    bio: messages.developerBio2,
    gitHub: messages.developerGitHub2,
  },
  {
    photo: Aizhan,
    name: messages.developerName3,
    role: messages.developerRole3,
    bio: messages.developerBio3,
    gitHub: messages.developerGitHub3,
  },
];

export { developers };
