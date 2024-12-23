import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Educonnect',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

export default connection;


