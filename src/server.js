const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS']
}));
app.use(bodyParser.json());

let notes = [
  { id: 1, content: "Первая заметка" },
  { id: 2, content: "Вторая заметка" }
];
let nextId = 3;

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const { content } = req.body;
  
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }
  
  const newNote = {
    id: nextId++,
    content: content
  };
  
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter(note => note.id !== id);
  res.status(200).json({ message: 'Note deleted' });
});

app.options('/notes', cors());
app.options('/notes/:id', cors());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server error');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});