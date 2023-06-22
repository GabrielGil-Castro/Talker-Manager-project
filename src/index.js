const express = require('express');
const crypto = require('crypto');
const { readFile } = require('./utils/readFiles');
const { writeFile } = require('./utils/writeFile');
const { validateLogin, 
        validateToken,
        validateName,
        validateAge,
        validateTalk,
        validateWatchedAt,
        validateRate } = require('./utils/validateInputs');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

const arrayDeValidações = [
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate];

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

app.post('/talker', arrayDeValidações, async (req, res) => {
    const talkers = await readFile();
    const talkerBody = { ...req.body, id: talkers.length + 1 };
    const talkerResponse = [...talkers, talkerBody];
    await writeFile(talkerResponse);

    return res.status(201).json(talkerBody);
  });

  app.put('/talker/:id', arrayDeValidações, async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  const findTalkerById = talkers.find((talker) => talker.id === Number(id));
  if (!findTalkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  const updateTalker = { ...req.body, id: Number(id) };
  const talkerIndex = talkers.indexOf(findTalkerById);
  talkers[talkerIndex] = updateTalker;
  await writeFile(talkers);
  return res.status(HTTP_OK_STATUS).json(updateTalker);
  });

  app.delete('/talker/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    
    const talkers = await readFile();
    const filteredTalkers = talkers.filter((talker) => talker.id !== Number(id));
    await writeFile(filteredTalkers);

    res.status(204).json({});
  });

 app.post('/login', validateLogin, async (req, res) => {
  const { email, password } = req.body;
  const token = crypto.randomBytes(8).toString('hex');
  if (email && password) return res.status(HTTP_OK_STATUS).json({ token });
});