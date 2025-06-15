class RankingManager {
  constructor() {
    this.currentTheme = 'all';
    this.currentDifficulty = 'all';
    this.scores = [];
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadRanking();
  }

  setupEventListeners() {
    
    document.querySelectorAll('[data-theme]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('[data-theme]').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.setActiveFilter('theme', e.target.dataset.theme);
      });
    });

    
    document.querySelectorAll('[data-difficulty]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('[data-difficulty]').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.setActiveFilter('difficulty', e.target.dataset.difficulty);
      });
    });

    
    document.querySelector('.back-button').addEventListener('click', () => {
      window.location.href = '/';
    });
  }

  setActiveFilter(type, value) {
    console.log(`Setando filtro - Tipo: ${type}, Valor: ${value}`);
    
    if (type === 'theme') {
      this.currentTheme = value;
    } else if (type === 'difficulty') {
      this.currentDifficulty = value;
    }

    
    this.displayRanking();
  }

  async loadRanking() {
    try {
      this.showLoading(true);
      
      const response = await fetch('/api/ranking');
      const data = await response.json();
      
      if (data.success) {
        console.log('Dados do ranking:', data.data);
        this.scores = data.data;
        this.displayRanking();
      } else {
        this.showError('Erro ao carregar ranking');
      }
    } catch (error) {
      console.error('Erro:', error);
      this.showError('Erro de conexão');
    } finally {
      this.showLoading(false);
    }
  }

  displayRanking() {
    const filteredScores = this.filterScores();
    const tableBody = document.getElementById('rankingTableBody');
    
    if (filteredScores.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" class="no-scores">
            <p>Nenhuma pontuação encontrada para este filtro 😢</p>
            <p style="margin-top: 20px; font-size: 0.8em;">Que tal jogar uma partida?</p>
          </td>
        </tr>
      `;
    } else {
      tableBody.innerHTML = filteredScores.map((score, index) => {
        return this.createRankingRow(score, index + 1);
      }).join('');
    }

    document.querySelector('.ranking-table').style.display = 'block';
  }

  filterScores() {
    let filtered = [...this.scores];
    console.log('Scores antes do filtro:', filtered);
    console.log('Filtros atuais - Tema:', this.currentTheme, 'Dificuldade:', this.currentDifficulty);

    
    if (this.currentTheme !== 'all') {
      filtered = filtered.filter(score => {
        console.log('Comparando tema:', score.theme, 'com', this.currentTheme);
        return score.theme?.toLowerCase().trim() === this.currentTheme.toLowerCase().trim();
            });
    }

    
    if (this.currentDifficulty !== 'all') {
      const difficultyNum = parseInt(this.currentDifficulty);
      filtered = filtered.filter(score => {
        console.log('Comparando dificuldade:', score.difficulty, 'com', difficultyNum);
        return score.difficulty === difficultyNum;
      });
    }

    console.log('Scores após filtros:', filtered);

    
    return filtered.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.time - b.time;
    });
  }

  createRankingRow(score, position) {
    const positionClass = position === 1 ? 'first' : position === 2 ? 'second' : position === 3 ? 'third' : '';
    const medal = position === 1 ? '🥇' : position === 2 ? '🥈' : position === 3 ? '🥉' : '';
    
    return `
      <tr class="${positionClass}">
        <td class="position">${position}${medal}</td>
        <td class="player">${this.escapeHtml(score.playerName)}</td>
        <td class="theme">${this.getThemeDisplay(score.theme)}</td>
        <td class="difficulty">${this.getDifficultyDisplay(score.difficulty)}</td>
        <td class="score">${score.score} pts</td>
        <td class="time">${this.formatTime(score.time)}</td>
        <td class="date">${this.formatDate(score.createdAt)}</td>
      </tr>
    `;
  }

  getThemeDisplay(theme) {
    switch (theme) {
      case 'rickandmorty':
      case 'rickmorty':
      case 'Rickmorty':
        return '🛸 Rick & Morty';
      case 'naruto':
        return '🍥 Naruto';
      default:
        return theme;
    }
  }

  getDifficultyDisplay(difficulty) {
    const difficultyNum = parseInt(difficulty);
    switch (difficultyNum) {
      case 5:
        return 'Fácil';
      case 10:
        return 'Médio';
      case 15:
        return 'Difícil';
      default:
        return difficultyNum + ' pares';
    }
  }

  formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  showLoading(show) {
    const loading = document.getElementById('loadingSpinner');
    const rankingTable = document.querySelector('.ranking-table-container');
    
    if (!loading || !rankingTable) {
      console.error('Loading or ranking table elements not found');
      return;
    }
    
    if (show) {
      loading.classList.remove('hidden');
      rankingTable.style.display = 'none';
    } else {
      loading.classList.add('hidden');
      rankingTable.style.display = 'block';
    }
  }

  showError(message) {
    const tableBody = document.getElementById('rankingTableBody');
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" class="error-message">
          <p style="color: #ff6b6b;">❌ ${message}</p>
          <button onclick="location.reload()" class="retry-button">
            Tentar Novamente
          </button>
        </td>
      </tr>
    `;
  }
}


document.addEventListener('DOMContentLoaded', () => {
  new RankingManager();
});