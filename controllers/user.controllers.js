const { createUser, findUserByEmail } = require("../services/user.service");

exports.register = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    const token = await createUser(name, email, password, mobile);
    res.api.successResponse({ message: 'User registered successfully', data: { token } });
  } catch (err) {
    res.api.errorResponse({ statusCode: 500, message: err.message });
  }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await findUserByEmail(email);
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.api.errorResponse({ statusCode: 401, message: 'Invalid credentials' });
      }
  
      const payload = {
        user: {
          id: user.id,
        },
      };
  
      const token = jwt.sign(payload, config.get('jwtSecret'), { expiresIn: config.get('jwtExpiration') });
      res.api.successResponse({ message: 'User logged in successfully', data: { token } });
    } catch (err) {
      res.api.errorResponse({ statusCode: 500, message: err.message });
    }
  };

