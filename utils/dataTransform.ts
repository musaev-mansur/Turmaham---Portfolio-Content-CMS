import { Language } from '../types';
import { ContentBlock, parseBlockData, FlexibleField } from './api';

function getFirstByType(fields: FlexibleField[], type: string): string {
  const f = fields.find((x) => x.type === type);
  return f?.value ?? '';
}

function getValuesByType(fields: FlexibleField[], type: string): string[] {
  return fields.filter((x) => x.type === type).map((x) => x.value);
}

// Для списков и карточек: один блок = один элемент; поддерживает гибкий (fields) и старый формат
export function blockToItem(block: ContentBlock, lang: Language) {
  const data = parseBlockData(block);

  if (data.fields && Array.isArray(data.fields)) {
    const fields = data.fields as FlexibleField[];
    const titleEn = getFirstByType(fields, 'titleEn');
    const titleRu = getFirstByType(fields, 'titleRu');
    const imageEn = getFirstByType(fields, 'imageEn');
    const imageRu = getFirstByType(fields, 'imageRu');
    const youtubes = getValuesByType(fields, 'youtube');
    return {
      id: block.id,
      section: block.section,
      order: block.order,
      type: block.type,
      title: { en: titleEn, ru: titleRu },
      description: { en: getFirstByType(fields, 'descEn'), ru: getFirstByType(fields, 'descRu') },
      image: lang === 'en' ? imageEn || imageRu : imageRu || imageEn,
      videoUrl: youtubes[0] ?? '',
      youtubeUrl2: youtubes[1] ?? '',
      fields,
      data,
    };
  }

  const titleRus = data.titleRus ?? '';
  const titleEng = data.titleEng ?? '';
  const imageRus = data.imageRus ?? data.image ?? '';
  const imageEng = data.imageEng ?? data.image ?? '';
  return {
    id: block.id,
    section: block.section,
    order: block.order,
    type: block.type,
    title: { en: titleEng, ru: titleRus },
    description: { en: data.descriptionEng ?? '', ru: data.descriptionRus ?? '' },
    image: lang === 'en' ? imageEng : imageRus,
    videoUrl: data.youtubeUrl1 ?? data.youtubeUrl ?? '',
    youtubeUrl2: data.youtubeUrl2 ?? '',
    fields: undefined,
    data,
  };
}

export function blocksToItems(blocks: ContentBlock[], lang: Language) {
  return blocks.map((b) => blockToItem(b, lang));
}
