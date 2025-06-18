# 🧠 Jogo da Memória 🧠

Um jogo da memória interativo feito com **HTML**, **CSS** e **JavaScript**, com **MongoDB** usado para armazenar pontuações e estatísticas dos jogadores. O objetivo é desafiar a memória do usuário combinando pares de cartas.

## 🎮 Projeto já hospedado 🎮
https://teste-render-pi3.onrender.com/ 

---

## 🎬 Vídeo Elevator Pitch do projeto 🎬
https://www.youtube.com/watch?v=FJEBj00EhUE

---

## 🚀 Funcionalidades 🚀

- Combinação de cartas com personagens de series famosos ()
- Sistema de pontuação e contagem de tempo
- Armazenamento de dados com **MongoDB**
- Reinício automático ao final da partida
- Interface amigável com animações CSS

---

## 🛠️ Tecnologias Utilizadas 🛠️

| Tecnologia   | Função                                                                 |
|--------------|------------------------------------------------------------------------|
| HTML5        | Estrutura básica do jogo                                               |
| CSS3         | Estilização e responsividade                                           |
| JavaScript   | Lógica do jogo (embaralhar, virar cartas, pontuar)                     |
| MongoDB      | Armazenamento de pontuações e partidas                                 |
| Node.js      | Backend para comunicação com o banco de dados                          |

---

## 🧩 Como Jogar 🧩

1. Clique em uma carta para virá-la.
2. Em seguida, clique em outra carta para tentar encontrar o par correspondente.
3. Se as cartas forem iguais, elas permanecem viradas.
4. Se forem diferentes, elas se viram de volta após um curto intervalo.
5. O jogo termina quando todos os pares forem encontrados.

---

## 📦 Instalação 📦

### ✅ Pré-requisitos ✅

- Node.js e npm instalados
- MongoDB local ou MongoDB Atlas

### ⚙️ Etapas ⚙️

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/jogo-da-memoria.git](https://github.com/FatecFranca/DSM-P3-G05-2025-1.git
cd jogo-da-memoria

# Instale as dependências 
npm install

# Configure as variáveis de ambiente 
cp .env.example .env
# Edite o arquivo .env com a URI do MongoDB

# Inicie o servidor 
npm start

# Abra o index.html no navegador ou acesse http://localhost:3000
