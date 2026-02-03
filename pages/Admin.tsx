import React, { useState, useEffect, useRef } from 'react';
import { blocksAPI, ContentBlock, parseBlockData, FlexibleField, FlexibleFieldType, uploadImageToImgBB } from '../utils/api';
import { Plus, Trash2, Edit3, Save, X, Lock, ArrowUp, ArrowDown, Upload } from 'lucide-react';

const SECTIONS = ['films', 'projects', 'works'] as const;
type Section = typeof SECTIONS[number];

const FIELD_TYPES: { value: FlexibleFieldType; label: string }[] = [
  { value: 'titleEn', label: 'Title (EN)' },
  { value: 'titleRu', label: 'Title (RU)' },
  { value: 'descEn', label: 'Description (EN)' },
  { value: 'descRu', label: 'Description (RU)' },
  { value: 'imageEn', label: 'Image URL (EN)' },
  { value: 'imageRu', label: 'Image URL (RU)' },
  { value: 'youtube', label: 'YouTube URL' },
];

const Admin: React.FC = () => {
  const [section, setSection] = useState<Section>('films');
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [fields, setFields] = useState<FlexibleField[]>([]);
  const [newFieldType, setNewFieldType] = useState<FlexibleFieldType>('titleEn');
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const loadBlocks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await blocksAPI.getBySection(section);
      setBlocks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blocks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadBlocks();
    }
  }, [isAuthenticated, section]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'studio2025') setIsAuthenticated(true);
    else alert('Invalid access code.');
  };

  const resetForm = () => {
    setEditingId(null);
    setFields([]);
  };

  const addField = () => {
    setFields((prev) => [...prev, { type: newFieldType, value: '' }]);
  };

  const updateField = (index: number, value: string) => {
    setFields((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], value };
      return next;
    });
  };

  const removeField = (index: number) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
  };

  const moveField = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= fields.length) return;
    setFields((prev) => {
      const next = [...prev];
      [next[index], next[newIndex]] = [next[newIndex], next[index]];
      return next;
    });
  };

  const isImageField = (type: FlexibleFieldType) => type === 'imageEn' || type === 'imageRu';

  const handleImageUpload = async (index: number, file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Выберите файл изображения (JPG, PNG, GIF и т.д.)');
      return;
    }
    setUploadingIndex(index);
    setError(null);
    try {
      const url = await uploadImageToImgBB(file);
      updateField(index, url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка загрузки на ImgBB');
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleSave = async () => {
    const hasTitle = fields.some((f) => (f.type === 'titleEn' || f.type === 'titleRu') && f.value.trim());
    if (!hasTitle && fields.length === 0) {
      alert('Добавьте хотя бы одно поле (например, заголовок)');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const payload = { section, type: 'item' as const, data: { fields } };
      if (editingId) {
        await blocksAPI.update(editingId, payload);
      } else {
        await blocksAPI.create({ ...payload, order: blocks.length });
      }
      await loadBlocks();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save block');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Удалить блок?')) return;
    setLoading(true);
    setError(null);
    try {
      await blocksAPI.delete(id);
      await loadBlocks();
      if (editingId === id) resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete block');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (block: ContentBlock) => {
    setEditingId(block.id);
    const data = parseBlockData(block);
    if (data.fields && Array.isArray(data.fields)) {
      setFields(data.fields as FlexibleField[]);
    } else {
      const list: FlexibleField[] = [];
      if (data.titleEng) list.push({ type: 'titleEn', value: data.titleEng });
      if (data.titleRus) list.push({ type: 'titleRu', value: data.titleRus });
      if (data.descriptionEng) list.push({ type: 'descEn', value: data.descriptionEng });
      if (data.descriptionRus) list.push({ type: 'descRu', value: data.descriptionRus });
      if (data.imageEng) list.push({ type: 'imageEn', value: data.imageEng });
      if (data.imageRus) list.push({ type: 'imageRu', value: data.imageRus });
      if (data.youtubeUrl1) list.push({ type: 'youtube', value: data.youtubeUrl1 });
      if (data.youtubeUrl2) list.push({ type: 'youtube', value: data.youtubeUrl2 });
      setFields(list);
    }
  };

  const moveBlock = async (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;
    const a = blocks[index];
    const b = blocks[newIndex];
    setLoading(true);
    setError(null);
    try {
      await blocksAPI.update(a.id, { order: b.order });
      await blocksAPI.update(b.id, { order: a.order });
      await loadBlocks();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reorder');
    } finally {
      setLoading(false);
    }
  };

  const getFieldLabel = (type: FlexibleFieldType) => FIELD_TYPES.find((t) => t.value === type)?.label ?? type;
  const isMultiline = (type: FlexibleFieldType) => type.startsWith('desc');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black px-6">
        <form onSubmit={handleAuth} className="w-full max-w-md space-y-8 text-center">
          <Lock className="mx-auto text-white/20" size={48} />
          <h1 className="text-3xl font-oswald uppercase tracking-widest">Studio Access</h1>
          <input
            type="password"
            placeholder="ACCESS CODE"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-white/20 p-4 text-center text-xl tracking-[1em] outline-none focus:border-white transition-all"
          />
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Hint: studio2025</p>
        </form>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-5xl font-oswald uppercase tracking-widest mb-12">Content Blocks</h1>
      {error && (
        <div className="mb-4 p-4 bg-red-900/20 border border-red-500/50 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex space-x-8 border-b border-white/10 mb-12">
        {SECTIONS.map((s) => (
          <button
            key={s}
            onClick={() => { setSection(s); resetForm(); }}
            className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all ${
              section === s ? 'text-white border-b-2 border-white' : 'text-zinc-500'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-6 bg-zinc-900 p-8 border border-white/5 sticky top-32 h-fit max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-oswald uppercase tracking-widest mb-4">
            {editingId ? 'Редактировать блок' : 'Добавить блок'}
          </h3>
          <p className="text-zinc-500 text-xs uppercase tracking-widest">
            Добавляйте поля в любом порядке и количестве
          </p>

          <div className="flex gap-2 items-center">
            <select
              value={newFieldType}
              onChange={(e) => setNewFieldType(e.target.value as FlexibleFieldType)}
              className="flex-1 bg-black border border-white/10 p-2 text-sm"
            >
              {FIELD_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={addField}
              className="p-2 border border-white/10 hover:border-white flex items-center gap-1"
            >
              <Plus size={16} /> Добавить
            </button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {fields.map((field, idx) => (
              <div key={idx} className="border border-white/10 p-3 bg-black/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-zinc-400">{getFieldLabel(field.type)}</span>
                  <div className="flex gap-1">
                    <button type="button" onClick={() => moveField(idx, 'up')} disabled={idx === 0} className="p-1 border border-white/10 hover:border-white disabled:opacity-30">
                      <ArrowUp size={12} />
                    </button>
                    <button type="button" onClick={() => moveField(idx, 'down')} disabled={idx === fields.length - 1} className="p-1 border border-white/10 hover:border-white disabled:opacity-30">
                      <ArrowDown size={12} />
                    </button>
                    <button type="button" onClick={() => removeField(idx)} className="p-1 border border-white/10 hover:border-red-500">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
                {isMultiline(field.type) ? (
                  <textarea
                    value={field.value}
                    onChange={(e) => updateField(idx, e.target.value)}
                    className="w-full bg-black border border-white/10 p-2 text-sm"
                    rows={3}
                  />
                ) : (
                  <>
                    <input
                      value={field.value}
                      onChange={(e) => updateField(idx, e.target.value)}
                      className="w-full bg-black border border-white/10 p-2 text-sm"
                      placeholder={isImageField(field.type) ? 'URL или загрузите файл ниже' : undefined}
                    />
                    {isImageField(field.type) && (
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          ref={(el) => { fileInputRefs.current[idx] = el; }}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleImageUpload(idx, f);
                            e.target.value = '';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRefs.current[idx]?.click()}
                          disabled={uploadingIndex === idx}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs border border-white/20 hover:border-white bg-white/5 disabled:opacity-50"
                        >
                          <Upload size={12} />
                          {uploadingIndex === idx ? 'Загрузка…' : 'Загрузить файл (ImgBB)'}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="flex space-x-2 pt-4">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 bg-white text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save size={14} /> {editingId ? 'Сохранить' : 'Добавить'}
            </button>
            <button
              onClick={resetForm}
              disabled={loading}
              className="px-4 border border-white/10 hover:border-white transition-all disabled:opacity-50"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <p className="text-zinc-500 text-sm uppercase tracking-widest">
            Секция: {section} · Блоков: {blocks.length}
          </p>
          {loading && blocks.length === 0 ? (
            <p className="text-zinc-500 uppercase tracking-widest text-center py-20">Loading...</p>
          ) : (
            blocks.map((block, idx) => {
              const data = parseBlockData(block);
              let title = '(без названия)';
              let img: string | undefined;
              if (data.fields && Array.isArray(data.fields)) {
                const f = data.fields as FlexibleField[];
                title = (f.find((x) => x.type === 'titleEn')?.value || f.find((x) => x.type === 'titleRu')?.value) || title;
                img = f.find((x) => x.type === 'imageEn')?.value || f.find((x) => x.type === 'imageRu')?.value;
              } else {
                title = data.titleEng || data.titleRus || title;
                img = data.imageEng || data.imageRus || data.image;
              }
              return (
                <div
                  key={block.id}
                  className="flex items-center gap-4 p-4 border border-white/10 bg-zinc-900/50 hover:bg-zinc-900 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <button onClick={() => moveBlock(idx, 'up')} disabled={idx === 0 || loading} className="p-1 border border-white/10 hover:border-white disabled:opacity-30">
                      <ArrowUp size={14} />
                    </button>
                    <button onClick={() => moveBlock(idx, 'down')} disabled={idx === blocks.length - 1 || loading} className="p-1 border border-white/10 hover:border-white disabled:opacity-30">
                      <ArrowDown size={14} />
                    </button>
                  </div>
                  {img ? (
                    <img src={img} alt="" className="w-24 h-24 object-cover grayscale flex-shrink-0" />
                  ) : (
                    <div className="w-24 h-24 bg-zinc-800 flex-shrink-0 flex items-center justify-center text-zinc-500 text-xs">No img</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-oswald uppercase tracking-widest font-bold whitespace-pre-wrap truncate">
                      {title}
                    </h4>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => startEdit(block)} disabled={loading} className="p-3 border border-white/10 hover:text-white transition-colors disabled:opacity-50">
                      <Edit3 size={16} />
                    </button>
                    <button onClick={() => handleDelete(block.id)} disabled={loading} className="p-3 border border-white/10 hover:text-red-500 transition-colors disabled:opacity-50">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
          {blocks.length === 0 && !loading && (
            <p className="text-zinc-500 uppercase tracking-widest text-center py-20">Нет блоков. Добавьте первый.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
