import GameScore from '../model/GameScore.js';

class ScoreController {
  
  static async saveScore(req, res) {
    try {
      console.log('📝 Dados recebidos:', req.body);
      const { playerName, score, time, theme, difficulty } = req.body;

      
      if (!playerName || score === undefined || !time || !theme || !difficulty) {
        return res.status(400).json({
          error: 'Dados obrigatórios: playerName, score, time, theme, difficulty'
        });
      }

      
      console.log('🎲 Tentando salvar:', { playerName, score, time, theme, difficulty });
      const newScore = await GameScore.create({
        playerName,
        score,
        time,
        theme,
        difficulty
      });
      console.log('✅ Score salvo com sucesso:', newScore);

      res.status(201).json({
        success: true,
        data: newScore
      });

    } catch (error) {
      console.error('❌ Erro ao salvar pontuação:', error);
      console.error('Stack trace:', error.stack);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  
  static async getRanking(req, res) {
    try {
      const rankings = await GameScore.findAll();
      console.log('🎮 Rankings encontrados:', rankings);

      res.json({
        success: true,
        data: rankings
      });

    } catch (error) {
      console.error('Erro ao buscar ranking:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  static async getRankingByTheme(req, res) {
    try {
      const { theme } = req.params;

      if (!['rickmorty', 'naruto'].includes(theme)) {
        return res.status(400).json({ error: 'Tema inválido. Use: rickmorty ou naruto' });
      }

      const rankings = await GameScore.findByTheme(theme);

      res.json({
        success: true,
        data: rankings
      });

    } catch (error) {
      console.error('Erro ao buscar ranking por tema:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  static async getRankingByDifficulty(req, res) {
    try {
      const { difficulty } = req.params;
      const difficultyNum = parseInt(difficulty);

      if (![6, 10, 15].includes(difficultyNum)) {
        return res.status(400).json({ error: 'Dificuldade inválida. Use: 6, 10 ou 15' });
      }

      const rankings = await GameScore.findByDifficulty(difficultyNum);

      res.json({
        success: true,
        data: rankings
      });

    } catch (error) {
      console.error('Erro ao buscar ranking por dificuldade:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  static async getPlayerHistory(req, res) {
    try {
      const { playerName } = req.params;
      const history = await GameScore.findByPlayer(playerName);

      res.json({
        success: true,
        data: history
      });

    } catch (error) {
      console.error('Erro ao buscar histórico do jogador:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export default ScoreController;