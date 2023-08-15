import express from 'express';
//ENDPOINT  POST api/users
//PURPOSE   Register a new user
//ACCESS    Public

const router = express.Router();

import {userLogin, createUser} from '../controllers/userController';

router.post('/login', userLogin);
router.post('/',createUser);

export default router;