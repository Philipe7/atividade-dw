const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());

app.post('/text', (req, res) => {
  const { action, text } = req.body;

  if (!action || !text) {
    return res.status(400).json({ error: 'Ação e texto são obrigatórios' });
  }

  let result;
  switch (action) {
    case 'lowercase':
      result = text.toLowerCase();
      break;
    case 'uppercase':
      result = text.toUpperCase();
      break;
    default:
      return res.status(400).json({ error: 'Ação inválida' });
  }

  res.json({ result });
});


app.get('/number', (req, res) => {
  const { action } = req.query;
  const numbers = req.query.numbers ? req.query.numbers.split(',').map(Number) : [];

  if (numbers.length === 0 || !action) {
    return res.status(400).json({ error: 'Ação e números são obrigatórios' });
  }

  let result;
  switch (action) {
    case 'minimum':
      result = Math.min(...numbers);
      break;
    case 'maximum':
      result = Math.max(...numbers);
      break;
    default:
      return res.status(400).json({ error: 'Ação inválida' });
  }

  res.json({ result });
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
