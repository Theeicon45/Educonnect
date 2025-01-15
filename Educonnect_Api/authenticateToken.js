import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key'; // You should have a config file for your secret key

const authenticateToken = (req, res, next) => {
  // Extract the token from the 'Authorization' header
  const token = req.header('Authorization')?.replace('Bearer ', '');


  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Verify the token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Error:', err.message); // Debugging log

      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    // // Attach the decoded payload (user info) to the request object
    // console.log('Decoded Token:', decoded);

    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  });
};

export default authenticateToken;
