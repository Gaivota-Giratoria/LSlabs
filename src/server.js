require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir os arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, '../public')));

// Entregar a homePage na rota raiz
app.get('/', (req, res) => {
   res.redirect('/pages/homePage/homePage.html');
});

app.listen(PORT, () => {
  console.log(`🔥 Servidor LS Labs rodando em http://localhost:${PORT}`);
});
