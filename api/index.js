const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Dados de exemplo (substitua por conexão com banco de dados real)
let atletas = [
    {
        id: 1,
        nome: "Rafael Barrucio",
        posicao: "Atacante",
        dataNascimento: "1976-03-28",
        foto: ""
    },
    {
        id: 2,
        nome: "Carlos Silva",
        posicao: "Meio-campo",
        dataNascimento: "1985-07-12",
        foto: ""
    },
    {
        id: 3,
        nome: "Ana Santos",
        posicao: "Goleira",
        dataNascimento: "1990-11-05",
        foto: ""
    }
];

// Rota para obter todos os atletas
app.get("/atletas", (req, res) => {
    res.json(atletas);
});

// Rota para adicionar novo atleta
app.post("/atletas", (req, res) => {
    const novoAtleta = {
        id: atletas.length + 1,
        ...req.body
    };
    atletas.push(novoAtleta);
    res.status(201).json(novoAtleta);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


