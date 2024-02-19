const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(__dirname + '/public'));

app.get('/',(req, res)=>{
    try {
        res.render('index');
    } catch (error) {
        console.log(error);  
    };
});

app.listen(PORT, () => {
    console.log(`my server running at http://localhost:${PORT}`);
});