const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userR');
const tripRoutes = require('./routes/tripR');
const commentRoutes = require('./routes/commentR');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const cors = require('cors');
const crypto = require('crypto');

mongoose.connect('mongodb://localhost/dbtravel_249', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => {
   console.log("MongoDB Connected");
   ensureAdminUser();
  })
  .catch(err => console.log(err));
  async function ensureAdminUser() {
    try {
      const adminUser = await User.findOne({ email: "admin@example.com" });
      if (!adminUser) {
        const newAdmin = new User({
          username: "admin",
          password: "adminpass", // automatski se hash-a password na pozivu save metode
          email: "admin@example.com",
          role: "admin",
          isActive: true
        });
        await newAdmin.save();
        console.log("Admin user created");
      }
    } catch (error) {
      console.error("Error ensuring admin user:", error);
    }
  }
const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/comments', commentRoutes);
app.use(cors());

app.get('/', (req, res) => {
  res.send('Travel Agency Portal');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}