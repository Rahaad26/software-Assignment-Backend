const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'grocerystore',
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
  seedDatabase();
});

app.use(cors());
app.use(bodyParser.json());

app.get('/api/products', (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/products', (req, res) => {
  const sql = 'INSERT INTO products SET ?';
  const product = req.body;
  db.query(sql, product, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.put('/api/products/:id', (req, res) => {
  const sql = 'UPDATE products SET ? WHERE id = ?';
  const product = req.body;
  const { id } = req.params;
  db.query(sql, [product, id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.delete('/api/products/:id', (req, res) => {
  const sql = 'DELETE FROM products WHERE id = ?';
  const { id } = req.params;
  db.query(sql, id, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

const seedDatabase = () => {
  const products = [
    {
      productName: 'KitKat',
      description: 'A classic break. Made to share. The signature KITKAT® recipe of smooth chocolate and crispy wafer in a fun size, perfect for enjoying with friends and family. Spend some quality time together and tear, share and bite to enjoy.',
      price: 10,
      imgUrl: 'https://example.com/images/kitkat.jpg',
    },
    {
      productName: 'Chocolate Chip Cookies',
      description: 'These are the best cookies I\'ve ever had. Incredible. Don\'t cut corners or you\'ll miss out. Do everything she says and you\'re in for the best cookies of your life.',
      price: 8,
      imgUrl: 'https://example.com/images/chocolate-chip-cookies.jpg',
    },
    {
      productName: 'Chocolate Cake',
      description: 'With a super moist crumb and fudgy, yet light texture, this chocolate cake recipe will soon be your favorite too. Top with chocolate buttercream and chocolate chips for 3x the chocolate flavor. You can also prepare this chocolate layer cake as a sheet cake, too. See recipe note.',
      price: 50,
      imgUrl: 'https://example.com/images/chocolate-cake.jpg',
    },
  ];

  products.forEach(product => {
    const sql = 'INSERT INTO products SET ?';
    db.query(sql, product, (err, result) => {
      if (err) throw err;
    });
  });
};

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
