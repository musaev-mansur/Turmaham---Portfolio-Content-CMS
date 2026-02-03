const API_BASE_URL = (import.meta.env as any).VITE_API_URL || '/api';

/** Загрузка изображения на ImgBB через наш сервер (ключ на сервере). Возвращает URL картинки. */
export async function uploadImageToImgBB(file: File): Promise<string> {
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
  const response = await fetch(`${API_BASE_URL}/upload-image`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: base64 }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(err.error || 'Upload failed');
  }
  const data = await response.json();
  if (!data.url) throw new Error('No URL in response');
  return data.url;
}

// Гибкое поле: тип + значение, порядок = индекс в массиве
export type FlexibleFieldType = 'titleEn' | 'titleRu' | 'descEn' | 'descRu' | 'imageEn' | 'imageRu' | 'youtube';

export interface FlexibleField {
  type: FlexibleFieldType;
  value: string;
}

export interface ContentBlockPayload {
  /** Гибкий формат: массив полей в нужном порядке */
  fields?: FlexibleField[];
  /** Старый формат (для обратной совместимости) */
  titleRus?: string;
  titleEng?: string;
  descriptionRus?: string;
  descriptionEng?: string;
  imageRus?: string;
  imageEng?: string;
  youtubeUrl1?: string;
  youtubeUrl2?: string;
  [key: string]: any;
}

export interface ContentBlock {
  id: string;
  section: string;
  order: number;
  type: string;
  data: string;
  createdAt?: string;
  updatedAt?: string;
}

// Единственный API: блоки контента
export const blocksAPI = {
  getBySection: async (section: string): Promise<ContentBlock[]> => {
    const response = await fetch(`${API_BASE_URL}/blocks?section=${encodeURIComponent(section)}`);
    if (!response.ok) throw new Error('Failed to fetch blocks');
    return response.json();
  },

  getAll: async (): Promise<ContentBlock[]> => {
    const response = await fetch(`${API_BASE_URL}/blocks`);
    if (!response.ok) throw new Error('Failed to fetch blocks');
    return response.json();
  },

  getById: async (id: string): Promise<ContentBlock> => {
    const response = await fetch(`${API_BASE_URL}/blocks/${id}`);
    if (!response.ok) throw new Error('Failed to fetch block');
    return response.json();
  },

  create: async (payload: { section: string; order?: number; type?: string; data: ContentBlockPayload }): Promise<ContentBlock> => {
    const response = await fetch(`${API_BASE_URL}/blocks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Failed to create block');
    return response.json();
  },

  update: async (id: string, payload: Partial<{ section: string; order: number; type: string; data: ContentBlockPayload }>): Promise<ContentBlock> => {
    const response = await fetch(`${API_BASE_URL}/blocks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error('Failed to update block');
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/blocks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete block');
  },
};

// Парсит data из блока (на сервере хранится как JSON string)
export function parseBlockData(block: ContentBlock): ContentBlockPayload {
  if (!block || block.data == null) return {};
  return typeof block.data === 'string' ? JSON.parse(block.data) : block.data;
}
