
import { Film, Project, Work } from '../types';

const INITIAL_FILMS: Film[] = [
  {
    id: 'f1',
    title: { en: 'Shattered Mirrors', ru: 'Разбитые зеркала' },
    description: { en: 'A psychological journey through light.', ru: 'Психологическое путешествие через свет.' },
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: { en: 'Neon Tokyo', ru: 'Неоновый Токио' },
    description: { en: 'Urban photography at 3AM.', ru: 'Городская фотография в 3 часа ночи.' },
    image: 'https://images.unsplash.com/photo-15420518418c7-59a970bb7871?q=80&w=1200'
  }
];

const INITIAL_WORKS: Work[] = [
  {
    id: 'w1',
    title: { en: 'Vogue editorial', ru: 'Эдиториал для Vogue' },
    description: { en: 'Commercial high-fashion project.', ru: 'Коммерческий fashion-проект.' },
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200'
  }
];

export const DataManager = {
  get: <T>(key: 'films' | 'projects' | 'works'): T[] => {
    const data = localStorage.getItem(`turmaham_${key}`);
    if (!data) {
      const initial = key === 'films' ? INITIAL_FILMS : key === 'projects' ? INITIAL_PROJECTS : INITIAL_WORKS;
      localStorage.setItem(`turmaham_${key}`, JSON.stringify(initial));
      return initial as unknown as T[];
    }
    return JSON.parse(data);
  },
  save: (key: 'films' | 'projects' | 'works', items: any[]) => {
    localStorage.setItem(`turmaham_${key}`, JSON.stringify(items));
  }
};
