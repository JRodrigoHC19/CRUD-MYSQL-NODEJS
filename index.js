const express = require('express');
const routes = require('./routes/tareas');

const app = express();

const PORT = 3000;
app.use('/static', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('views', './public');
app.set('view engine', 'pug');

app.use("/", routes);

app.listen(PORT, () => {
    console.log(`El servidor se ha desplegado correctamente`);
    console.log(`Link: ${PORT}`);
})