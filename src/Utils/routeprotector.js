import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key'; // Replace with your actual secret key

const routeprotector = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify and decode the token at the same time
    const decoded = jwt.verify(token, SECRET_KEY); 
    const { userId, role } = decoded; // Destructuring userId and role from the decoded token

    // You can now use the userId and role for authorization or storing in the request object
    req.user = { userId, role };
    
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

export default routeprotector;
