//ENDPOINT  POST api/users
//PURPOSE   Register a new user
//ACCESS    Public
const registerUser = async (req, res, next) => {
  return next();
};

//ENDPOINT  POST api/users/login
//PURPOSE   Authenticate User and get token
//ACCESS    Public
const authUser = async (req, res) => {};

export { registerUser, authUser };
