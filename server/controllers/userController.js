import db from '../models/dbModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserController = {
  async createUser(req, res, next) {
    try {
      console.log('------entering create user controller----');
      console.log('body: ', req.body);
      const { password, username} = req.body;
      const hashed = await bcrypt.hash(password, 10);
      const query =
        'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
      const values = [username, hashed];
      const newUser = await db.query(query, values);

      // log the sign up
      console.log('New user signup:', newUser.rows[0]);
      res.locals.newUser = newUser.rows[0];
      return next();
    } catch (error) {
      console.error('Error during user signup:', error);
      return next({
        log: 'Express error in createUser Middleware',
        status: 500,
        message: { err: 'An error occurred during sign-up' },
      });
    }
  },
  // get method for fetching user based off of username
  async userLogin(req, res, next) {
    try {
      console.log('------entering userLogin controller----');
      console.log('body: ', req.body);
      const { username, password } = req.body;
      const query =
        `SELECT * FROM users WHERE username = '${username}'`;
      const data = await db.query(query);
      res.locals.data = data.rows[0];
      const hashedPass = data.rows[0].password;
      const id = data.rows[0].id;
      const passOk = await bcrypt.compare(password, hashedPass);
      if (passOk){
        const secret = 'SQUIRTLESQUIRTLESQUIRTLE'
        const accessToken = jwt.sign({id}, secret, {expiresIn: '1d'});
        res.cookie('accessToken',accessToken, {
            httpOnly : true,
            secure: true
        });
      }
      else {
        return next({
          log: 'Failed credentials',
          status: 400,
          message: { err: 'Failed matching user credentials' },
        })
      }
    }
    catch (error) {
      console.error('Error during user login:', error);
      return next({
        log: 'Express error in userLogin Middleware',
        status: 500,
        message: { err: 'An error occurred during login' },
      });
    }
  },


  verifyCookie (req, res, next){
    const cookie = req.cookies;
    if(!cookie.accessToken) return res.send('User is not signed in');
    return next();
  }
};


module.exports = UserController;
