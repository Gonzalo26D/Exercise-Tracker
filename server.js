const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Inicializar la app de Express
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cadena de conexión a MongoDB
const uri = "mongodb+srv://USUARIO:hola123@cluster0.mongodb.net/exercise_tracker?retryWrites=true&w=majority";

// Conectar a MongoDB
mongoose.connect(uri)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Definir el esquema de Usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Rutas

// Crear un nuevo usuario
app.post('/api/users', async (req, res) => {
  const { username } = req.body;
  const user = new User({ username });
  await user.save();
  res.json(user);
});

// Obtener todos los usuarios
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
