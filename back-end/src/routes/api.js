import express from 'express';
import ScoreController from '../controllers/ScoreController.js';

const router = express.Router();

router.post('/scores', ScoreController.saveScore);

router.get('/ranking', ScoreController.getRanking);

router.get('/', (req, res) => {
    res.json({ message: 'API está funcionando!' });
});

router.get('/ranking/theme/:theme', ScoreController.getRankingByTheme);

router.get('/ranking/difficulty/:difficulty', ScoreController.getRankingByDifficulty);

router.get('/player/:playerName/history', ScoreController.getPlayerHistory);

export default router;





