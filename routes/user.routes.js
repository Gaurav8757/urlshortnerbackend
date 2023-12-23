// routes/authRoutes.js
import express from 'express';
import authenticateToken from '../authentication/user.auth.js';
import * as authController from '../controller/user.controller.js';
import * as urlShortner from "../controller/url.controller.js"
const router = express.Router();

// Register endpoint
router.post('/register', authController.userRegister);

// Login endpoint using passport
router.post('/login',  authController.login);

// Secured homepage with protected form
router.get('/homepage', authenticateToken, authController.securedHomepage);

// Protected form submission endpoint
router.post('/homepage/urlshortner',  urlShortner.protectedUrlShortner);

router.get('/homepage/:short_url',  urlShortner.shortUrl);

// Logout functionality
router.post('/logout',  authController.logout);


export default router;
