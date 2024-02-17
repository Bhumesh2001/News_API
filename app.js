const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static('public'));

app.use('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
    console.log(`my server running at http://localhost:${PORT}`);
});