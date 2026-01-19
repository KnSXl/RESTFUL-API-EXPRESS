const app = require('./config/express.js')();
const port = app.get('port');

// Rodando nossa aplicação na porta setada
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Rota raiz da API
app.get('/', (req, res) => {
    res.json({ message: 'Server running!' });
});