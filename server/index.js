import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '15mb' }));

const blockWithAuthor = {
  author: {
    select: { id: true, name: true, slug: true },
  },
};

// Единственный CRUD: ContentBlock
// GET /api/blocks?section=films — список блоков секции (по order)
app.get('/api/blocks', async (req, res) => {
  try {
    const { section, authorId } = req.query;
    const where = {};
    if (section) where.section = section;
    if (authorId) where.authorId = authorId;
    const blocks = await prisma.contentBlock.findMany({
      where,
      orderBy: [{ section: 'asc' }, { order: 'asc' }],
      include: blockWithAuthor,
    });
    res.json(blocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/blocks/:id — один блок
app.get('/api/blocks/:id', async (req, res) => {
  try {
    const block = await prisma.contentBlock.findUnique({
      where: { id: req.params.id },
      include: blockWithAuthor,
    });
    if (!block) {
      return res.status(404).json({ error: 'Block not found' });
    }
    res.json(block);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/blocks — создать блок
app.post('/api/blocks', async (req, res) => {
  try {
    const { section, order, type, data, authorId } = req.body;
    const dataStr = typeof data === 'string' ? data : JSON.stringify(data || {});
    const block = await prisma.contentBlock.create({
      data: {
        section: section || 'films',
        order: order !== undefined ? order : 0,
        type: type || 'item',
        authorId: authorId || null,
        data: dataStr,
      },
      include: blockWithAuthor,
    });
    res.json(block);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/blocks/:id — обновить блок
app.put('/api/blocks/:id', async (req, res) => {
  try {
    const { section, order, type, data, authorId } = req.body;
    const updateData = {};
    if (section !== undefined) updateData.section = section;
    if (order !== undefined) updateData.order = order;
    if (type !== undefined) updateData.type = type;
    if (authorId !== undefined) updateData.authorId = authorId || null;
    if (data !== undefined) {
      updateData.data = typeof data === 'string' ? data : JSON.stringify(data);
    }
    const block = await prisma.contentBlock.update({
      where: { id: req.params.id },
      data: updateData,
      include: blockWithAuthor,
    });
    res.json(block);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Authors CRUD
app.get('/api/authors', async (_req, res) => {
  try {
    const authors = await prisma.author.findMany({
      orderBy: [{ name: 'asc' }],
    });
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/authors/:id', async (req, res) => {
  try {
    const author = await prisma.author.findUnique({
      where: { id: req.params.id },
    });
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/authors', async (req, res) => {
  try {
    const { name, slug, bio } = req.body;
    if (!name || !slug) return res.status(400).json({ error: 'name and slug are required' });
    const author = await prisma.author.create({
      data: { name, slug, bio: bio || null },
    });
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/authors/:id', async (req, res) => {
  try {
    const { name, slug, bio } = req.body;
    const author = await prisma.author.update({
      where: { id: req.params.id },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(slug !== undefined ? { slug } : {}),
        ...(bio !== undefined ? { bio } : {}),
      },
    });
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/authors/:id', async (req, res) => {
  try {
    await prisma.author.delete({ where: { id: req.params.id } });
    res.json({ message: 'Author deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/blocks/:id — удалить блок
app.delete('/api/blocks/:id', async (req, res) => {
  try {
    await prisma.contentBlock.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Block deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/upload-image — загрузка изображения на ImgBB (ключ хранится на сервере)
const IMGBB_API_KEY = process.env.IMGBB_API_KEY;
app.post('/api/upload-image', async (req, res) => {
  if (!IMGBB_API_KEY) {
    return res.status(500).json({ error: 'IMGBB_API_KEY not configured' });
  }
  try {
    const { image } = req.body;
    if (!image || typeof image !== 'string') {
      return res.status(400).json({ error: 'Missing image (base64 string)' });
    }
    const form = new URLSearchParams();
    form.set('key', IMGBB_API_KEY);
    form.set('image', image.replace(/^data:image\/\w+;base64,/, ''));
    const imgbbRes = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: form,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    const json = await imgbbRes.json();
    if (!json.success || !json.data?.url) {
      return res.status(400).json({ error: json.error?.message || 'ImgBB upload failed' });
    }
    res.json({ url: json.data.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
