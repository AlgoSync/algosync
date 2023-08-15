import express from 'express';

const router = express.Router();

import {userLogin, createUser} from '../controllers/userController';

router.post('/login', userLogin);
router.post('/',createUser);
