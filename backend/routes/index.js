import express from "express";
import { getUsers, Register, Login, Logout } from "../controller/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/RefreshToken.js";
import { getHairstyleUrlsHandler } from "../server/handler.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.get('/hairstyles', getHairstyleUrlsHandler);

export default router;