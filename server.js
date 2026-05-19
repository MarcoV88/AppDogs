const express = require("express");
const registerRoutes = require("./routes/registerRoutes");
const loginRoutes = require("./routes/loginRoutes");
const app = express();
const PORT = 3000;

app.use(express.json());

// Rutas de la API
app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});