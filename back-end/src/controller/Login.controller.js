const SigninService = require('../services/Login.service');

const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await SigninService.signin(email, password);
  
    return res.status(200).json(user);
};

module.exports = { signin };
