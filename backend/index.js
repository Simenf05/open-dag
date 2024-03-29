const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const redis = require('redis');

const url = `redis://localhost:6379`;
// 192.168.0.101
const redisClient = redis.createClient({
    url
});

redisClient.on('error', err => console.log(err));
redisClient.connect();


async function checkRedis(key) {
    const isKey = await redisClient.exists(key);
    return isKey;
}

async function getRandomWord() {
    const key = await redisClient.RANDOMKEY();
    const word = await redisClient.get(key);
    return word;
}

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'frontend', 'spill')))
app.use(express.static(path.join(__dirname, 'frontend', 'video')))

app.use(express.static(path.join(__dirname, 'frontend')))


app.get("/api/word", (req, res) => {
    getRandomWord()
    .then(randomWord => {
        res.json({"word": randomWord})
    })
    .catch(err => {
        console.log(err);
    })
})

app.post("/api/submit", (req, res) => {
    checkRedis(req.body.word)
    .then(iskey => res.json({"value": iskey}));
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})