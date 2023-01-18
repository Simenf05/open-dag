const express = require('express');
const path = require('path');

const app = express();
const port = 8080;



app.use(express.static(path.join(__dirname, 'frontend', 'spill')))
app.use(express.static(path.join(__dirname, 'frontend', 'video')))

app.use(express.static(path.join(__dirname, 'frontend')))


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})