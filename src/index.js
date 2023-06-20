const express = require('express');
const crypto = require('crypto');
const { readFile } = require('./utils/readFiles');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const talkers = await readFile();
  if (talkers === []) return res.status(HTTP_OK_STATUS).json([]);
  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = await readFile();
  const { id } = req.params;
  const findTalkerById = talkers.find((talker) => talker.id === Number(id));
  if (!findTalkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
    
  return res.status(HTTP_OK_STATUS).json(findTalkerById);
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const token = crypto.randomBytes(8).toString('hex');
  if (email && password) return res.status(HTTP_OK_STATUS).json({ token });
});