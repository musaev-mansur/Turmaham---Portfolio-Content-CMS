
import { Film, Product, AccordionItem } from '../types';

export const films: Film[] = [
  {
    id: 'f1',
    title: { en: 'Shattered Mirrors', ru: 'Разбитые зеркала' },
    description: { en: 'A psychological journey through light.', ru: 'Психологическое путешествие через свет.' },
    image: 'https://picsum.photos/id/10/800/450',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // default video
    versions: [
      {
        id: 'v1',
        label: 'Original',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'The director\'s cut. Pure visual storytelling.'
      },
      {
        id: 'v2',
        label: 'Dubbed',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Professionally dubbed for international audiences.'
      },
      {
        id: 'v3',
        label: 'Subtitles',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Original audio with subtitles for maximum authenticity.'
      }
    ]
  },
  {
    id: 'f2',
    title: { en: 'Golden Hour', ru: 'Золотой час' },
    description: { en: 'Captured in the last minutes of light.', ru: 'Снято в последние минуты света.' },
    image: 'https://picsum.photos/id/15/800/450',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // default video
    versions: [
      {
        id: 'v1',
        label: 'Original',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        description: 'Captured in the last minutes of light.'
      }
    ]
  }
];

export const products: Product[] = [
  {
    id: 'p1',
    title: { en: 'Urban Solitude #4', ru: 'Городское одиночество #4' },
    description: { 
      en: 'A high-contrast black and white shot of a lone figure in New York.',
      ru: 'Высококонтрастный черно-белый снимок одинокой фигуры в Нью-Йорке.'
    },
    image: 'https://picsum.photos/id/101/600/800',
    variations: {
      format: [
        { id: 'f_jpg', name: { en: 'JPG', ru: 'JPG' }, price: 0 },
        { id: 'f_tiff', name: { en: 'TIFF (Lossless)', ru: 'TIFF (Без потерь)' }, price: 15 }
      ],
      resolution: [
        { id: 'r_hd', name: { en: 'HD (1080p)', ru: 'HD (1080p)' }, price: 0 },
        { id: 'r_4k', name: { en: '4K Ultra', ru: '4K Ультра' }, price: 25 }
      ],
      license: [
        { id: 'l_personal', name: { en: 'Personal', ru: 'Личное' }, price: 10 },
        { id: 'l_commercial', name: { en: 'Commercial', ru: 'Коммерческое' }, price: 150 }
      ]
    }
  },
  {
    id: 'p2',
    title: { en: 'Mountain Echoes', ru: 'Горное эхо' },
    description: { 
      en: 'Serene landscape from the Altai mountains at dawn.',
      ru: 'Спокойный пейзаж Алтайских гор на рассвете.'
    },
    image: 'https://picsum.photos/id/201/600/800',
    variations: {
      format: [
        { id: 'f_jpg', name: { en: 'JPG', ru: 'JPG' }, price: 0 }
      ],
      resolution: [
        { id: 'r_hd', name: { en: 'HD', ru: 'HD' }, price: 0 },
        { id: 'r_4k', name: { en: '4K', ru: '4K' }, price: 30 }
      ],
      license: [
        { id: 'l_personal', name: { en: 'Personal', ru: 'Личное' }, price: 15 }
      ]
    }
  }
];

export const projects: AccordionItem[] = [
  {
    id: 'pr1',
    title: { en: 'Silent Streets', ru: 'Тихие улицы' },
    content: { 
      en: 'A visual exploration of cities during the quietest hours of the night.',
      ru: 'Визуальное исследование городов в самые тихие часы ночи.'
    },
    image: 'https://picsum.photos/id/12/1200/800'
  },
  {
    id: 'pr2',
    title: { en: 'Neon Dreams', ru: 'Неоновые сны' },
    content: { 
      en: 'High saturation night photography inspired by cyberpunk aesthetics.',
      ru: 'Ночная фотография с высокой насыщенностью, вдохновленная эстетикой киберпанка.'
    },
    image: 'https://picsum.photos/id/13/1200/800'
  }
];

export const works: AccordionItem[] = [
  {
    id: 'w1',
    title: { en: 'Vogue Editorial', ru: 'Эдиториал для Vogue' },
    content: { en: 'High fashion portraiture.', ru: 'Портретная съемка высокой моды.' },
    image: 'https://picsum.photos/id/20/1200/800'
  },
  {
    id: 'w2',
    title: { en: 'National Geographic', ru: 'National Geographic' },
    content: { en: 'Documenting the wild.', ru: 'Документирование дикой природы.' },
    image: 'https://picsum.photos/id/21/1200/800'
  }
];

export const artists: AccordionItem[] = [
  {
    id: 'a1',
    title: { en: 'Elena Rostova', ru: 'Елена Ростова' },
    content: { en: 'Lead Cinematographer.', ru: 'Ведущий кинооператор.' },
    image: 'https://picsum.photos/id/64/1200/800'
  },
  {
    id: 'a2',
    title: { en: 'Mark Thompson', ru: 'Марк Томпсон' },
    content: { en: 'Portrait Specialist.', ru: 'Специалист по портретам.' },
    image: 'https://picsum.photos/id/65/1200/800'
  }
];
