import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './src/routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'src/view/public')));
app.use('/css', express.static(path.join(__dirname, 'src/view/public/css')));
app.use('/js', express.static(path.join(__dirname, 'src/view/public/js')));
app.use('/assets', express.static(path.join(__dirname, 'src/view/public/assets')));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/view/public/pages/index.html'));
});

app.get('/ranking', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/view/public/pages/ranking.html'));
});

app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/view/public/pages/game.html'));
});

app.get('/game/rickmorty', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/view/public/pages/gamericky.html'));
});

app.get('/game/naruto', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/view/public/pages/gamenaruto.html'));
});

app.listen(PORT, () => {
  console.log('\n🚀 Servidor rodando na porta ' + PORT);
  console.log('🌐 Acesse: http://localhost:' + PORT);
  console.log('📊 API: http://localhost:' + PORT + '/api');
}); 