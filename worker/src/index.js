import { Router } from 'itty-router';
import { corsMiddleware, handleCors } from './middleware/cors';
import { authMiddleware } from './middleware/auth';
import { rateLimitMiddleware } from './middleware/rateLimit';
import { authRoutes } from './routes/auth';
import { lessonRoutes } from './routes/lessons';
import { practiceRoutes } from './routes/practice';
import { assessmentRoutes } from './routes/assessment';
import { userRoutes } from './routes/user';
import { paymentRoutes } from './routes/payment';
import { jsonResponse, errorResponse } from './utils/responses';

const router = Router();

// CORS preflight
router.options('*', handleCors);

// Health check
router.get('/health', () => jsonResponse({ status: 'ok', timestamp: new Date().toISOString() }));

// Public routes
router.post('/auth/register', corsMiddleware, ...authRoutes.register);
router.post('/auth/login', corsMiddleware, ...authRoutes.login);
router.post('/auth/forgot-password', corsMiddleware, ...authRoutes.forgotPassword);
router.post('/auth/reset-password', corsMiddleware, ...authRoutes.resetPassword);

// Protected routes
router.get('/auth/me', corsMiddleware, authMiddleware, ...authRoutes.me);
router.put('/auth/profile', corsMiddleware, authMiddleware, ...authRoutes.updateProfile);

// Lessons
router.get('/lessons', corsMiddleware, authMiddleware, ...lessonRoutes.getAll);
router.get('/lessons/recommended', corsMiddleware, authMiddleware, ...lessonRoutes.getRecommended);
router.get('/lessons/category/:category', corsMiddleware, authMiddleware, ...lessonRoutes.getByCategory);
router.get('/lessons/:id', corsMiddleware, authMiddleware, ...lessonRoutes.getById);
router.post('/lessons/:id/complete', corsMiddleware, authMiddleware, ...lessonRoutes.complete);

// Practice
router.post('/practice/analyze-speech', corsMiddleware, authMiddleware, rateLimitMiddleware, ...practiceRoutes.analyzeSpeech);
router.post('/practice/conversation', corsMiddleware, authMiddleware, rateLimitMiddleware, ...practiceRoutes.conversation);
router.post('/practice/pronunciation', corsMiddleware, authMiddleware, ...practiceRoutes.pronunciation);
router.get('/practice/vocabulary/:level', corsMiddleware, authMiddleware, ...practiceRoutes.vocabulary);
router.get('/practice/fluency/:level', corsMiddleware, authMiddleware, ...practiceRoutes.fluency);
router.post('/practice/session', corsMiddleware, authMiddleware, ...practiceRoutes.saveSession);

// Assessment
router.post('/assessment/start', corsMiddleware, authMiddleware, ...assessmentRoutes.start);
router.post('/assessment/:id/submit', corsMiddleware, authMiddleware, ...assessmentRoutes.submit);
router.get('/assessment/:id/results', corsMiddleware, authMiddleware, ...assessmentRoutes.getResults);
router.get('/assessment/history', corsMiddleware, authMiddleware, ...assessmentRoutes.getHistory);

// User/Progress
router.get('/user/dashboard', corsMiddleware, authMiddleware, ...userRoutes.getDashboard);
router.get('/user/stats', corsMiddleware, authMiddleware, ...userRoutes.getStats);
router.get('/user/history', corsMiddleware, authMiddleware, ...userRoutes.getHistory);
router.get('/user/achievements', corsMiddleware, authMiddleware, ...userRoutes.getAchievements);
router.get('/user/leaderboard', corsMiddleware, authMiddleware, ...userRoutes.getLeaderboard);

// Payment
router.post('/payment/create-checkout', corsMiddleware, authMiddleware, ...paymentRoutes.createCheckout);
router.get('/payment/subscription', corsMiddleware, authMiddleware, ...paymentRoutes.getSubscription);
router.post('/payment/cancel', corsMiddleware, authMiddleware, ...paymentRoutes.cancel);
router.post('/payment/webhook', ...paymentRoutes.webhook);
router