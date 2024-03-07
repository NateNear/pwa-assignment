const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();

app.use(cors());

app.use(express.json());

const users = [
  { id: 1, username: 'user1', password: '$2b$10$ztiv0Qbe954CS./l7/xzi.1j7x1TPZt8q10I9/6lsxgUpGvwow7Qe' }
];

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Received credentials:', { username, password });
  const user = users.find((u) => u.username === username);


  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username: user.username, id: user.id }, 'secret_key', { expiresIn: '1h' });
    console.log('Password comparison result:', true);

    res.json({ token });
  } else {
    console.log('Password comparison result:', false);
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
