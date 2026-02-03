
import { TranslationSet } from './types';

export const translations: Record<'en' | 'ru', TranslationSet> = {
  en: {
    nav: {
      home: 'Home',
      films: 'Films',
      projects: 'Projects',
      works: 'Works',
      admin: 'Admin',
      shop: 'Shop',
    },
    common: {
      back: 'Go Back',
      readMore: 'Read More',
    },
    home: {
      heroTitle: 'TURMAHAM',
      heroSubtitle: 'CAPTURING THE ESSENCE OF TIME THROUGH LIGHT AND MOTION',
      cta: 'Explore Films',
    },
    films: {
      versions: 'Select Version',
    },
    shop: {
      cart: 'Your Cart',
      emptyCart: 'Your cart is empty',
      total: 'Total',
      checkout: 'Proceed to Checkout',
      format: 'Format',
      resolution: 'Resolution',
      license: 'License Type',
      addToCart: 'Add to Cart',
      thanks: 'Thank you for your purchase',
      downloadLinks: 'Download Links',
      emailRequired: 'Email Address',
      completePayment: 'Complete Payment',
    },
    admin: {
      title: 'Studio Management',
      add: 'Add New',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save Changes',
      cancel: 'Cancel',
    },
  },
  ru: {
    nav: {
      home: 'Главная',
      films: 'Фильмы',
      projects: 'Проекты',
      works: 'Работы',
      admin: 'Админ',
      shop: 'Магазин',
    },
    common: {
      back: 'Назад',
      readMore: 'Подробнее',
    },
    home: {
      heroTitle: 'TURMAHAM',
      heroSubtitle: 'ЗАПЕЧАТЛЕВАЯ СУТЬ ВРЕМЕНИ ЧЕРЕЗ СВЕТ И ДВИЖЕНИЕ',
      cta: 'Смотреть фильмы',
    },
    films: {
      versions: 'Выбор версии',
    },
    shop: {
      cart: 'Корзина',
      emptyCart: 'Корзина пуста',
      total: 'Итого',
      checkout: 'Оформить заказ',
      format: 'Формат',
      resolution: 'Разрешение',
      license: 'Тип лицензии',
      addToCart: 'В корзину',
      thanks: 'Спасибо за покупку',
      downloadLinks: 'Ссылки для скачивания',
      emailRequired: 'Электронная почта',
      completePayment: 'Оплатить заказ',
    },
    admin: {
      title: 'Управление студией',
      add: 'Добавить',
      edit: 'Изменить',
      delete: 'Удалить',
      save: 'Сохранить',
      cancel: 'Отмена',
    },
  },
};
