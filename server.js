const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs'); 
const path = require('path');
const jwt = require('jsonwebtoken'); 
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1212312121',
    database: 'orderlys'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL Database');
});

app.use(express.static(path.join(__dirname, 'public')));

// API สำหรับสมัครสมาชิก ========================================================	
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    const checkUserQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.query(checkUserQuery, [username, email], (err, results) => {
        if (err) {
            console.error('Error checking user:', err);
            return res.status(500).send('Error checking user');
        }

        if (results.length > 0) {
            return res.status(400).send('Username or email already exists');
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).send('Error encrypting password');
            }

            const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
            db.query(query, [username, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error registering user:', err);
                    return res.status(500).send('Error registering user');
                }

        
                res.redirect('/success.html?message=register_success');
            });
        });
    });
});

// API สำหรับเข้าสู่ระบบ ========================================================
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).send('Error fetching user');
        }

        if (results.length === 0) {
            return res.status(401).send('Username or password incorrect');
        }

        const user = results[0];


        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).send('Server error');
            }

            if (!isMatch) {
            
                return res.status(400).send('Incorrect password');
            }

        
            const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });

            res.redirect('/success.html?message=login_success');
        });
    });
});

// การเพิ่มสินค้า ========================================================
app.post('/admin', (req, res) => {
    const { name, price, description } = req.body;

    if (!name || !price || !description) {
        return res.status(400).send('Missing required fields');
    }

    const query = 'INSERT INTO products (name, price, description) VALUES (?, ?, ?)';
    
    db.query(query, [name, price, description], (err, result) => {
        if (err) {
            console.error('Error adding product:', err);
            return res.status(500).send('Error adding product');
        }

        res.redirect('/success.html?message=product_added');
    });
});


// เริ่มการทำงานของเซิร์ฟเวอร์ ========================================================
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
