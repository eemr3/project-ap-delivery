const SigninService = require('../services/Login.service');

const signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await SigninService.signIn(email, password);
  
    return res.status(200).json(user);
};

module.exports = { signIn };
