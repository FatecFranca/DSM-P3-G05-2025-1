import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Definir corretamente __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servindo arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
