const jwt = require('jsonwebtoken');

const authMiddleware = async (request, response, next) => {
  try {
    const { token } = request.headers;

    if (!token) {
      return response.status(401).json({ message: 'Unauthorized' });
    }

    const decodedToken = await jwt.verify(token, 'itm');
    console.log(decodedToken);

    if (!decodedToken) {
      return response.status(401).json({ message: 'Token is invalid' });
    }

    request.user = decodedToken;

    next();
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = authMiddleware;
