import prisma from '../lib/Prisma.js';

class GameScore {
  static async create(data) {
    console.log('🎮 GameScore.create - Dados recebidos:', data);
    try {
      const result = await prisma.gameScore.create({
        data: {
          playerName: data.playerName.trim(),
          score: parseInt(data.score),
          time: parseInt(data.time),
          theme: data.theme,
          difficulty: parseInt(data.difficulty)
        }
      });
      console.log('🎮 GameScore.create - Score criado:', result);
      return result;
    } catch (error) {
      console.error('🎮 GameScore.create - Erro:', error);
      console.error('Stack trace:', error.stack);
      throw error;
    }
  }

  static async findAll(options = {}) {
    console.log('🎮 GameScore.findAll - Buscando scores com opções:', options);
    const scores = await prisma.gameScore.findMany({
      orderBy: [
        { score: 'desc' },
        { time: 'asc' }
      ],
      ...options
    });
    console.log('🎮 GameScore.findAll - Scores encontrados:', scores);
    return scores;
  }

  static async findByTheme(theme, limit = 10) {
    return this.findAll({
      where: { theme },
      take: limit
    });
  }

  static async findByDifficulty(difficulty, limit = 10) {
    return this.findAll({
      where: { difficulty: parseInt(difficulty) },
      take: limit
    });
  }

  static async findByPlayer(playerName, limit = 20) {
    return prisma.gameScore.findMany({
      where: {
        playerName: {
          contains: playerName,
          mode: 'insensitive'
        }
      },
      orderBy: { createdAt: 'desc' },
      take: limit
    });
  }
}

export default GameScore; 