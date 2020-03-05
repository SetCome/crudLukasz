const express = require('express')

const movies = [
    "Alladyn",
    "Sinbad",
    "John Wick",
    "Lucyfer",
    "Sabrina",
    "Game of Thrones",
    "Klan"
]

const app = express()
app.use(express.json())

app.get('/api/movies', (req, res) => {
    res.send(movies)
})

app.get('/api/movies/:id', (req, res) => {
    const movieId = req.params.id
    if (movies[movieId]) {
        res.send(movies[movieId])
    } else {
        res.status(401).send("Bad request")
    }
})

app.post('/api/movies', (req, res) => {
    const { movie } = req.body 
    
    if ( !movies.includes(movie) ) {
        movies.push(movie)
        res.send(movies)
    } else {
        res.status(400).send("Movies already in our list")
    }
})

app.put('/api/movies/:id', (req, res) => {
    const movieId = req.params.id
    if(!movies[movieId]){
        res.status(401).send("Bad request")
        return;
    }
    const { movie } = req.body
    if (movies.includes(movie)){
        res.status(400).send("Movies already in our list");
        return;
    }
    movies[movieId] = movie;
    res.send(movies)
    //Napisac updaty listy
})

function usuńElement(tab,n) {
    let początek = tab.slice(0, n)
    let koniec = tab.slice(n+1)
    return [...początek, ...koniec];
}

app.use(express.static('public'));

app.delete('/api/movies/:id', (req, res) => {
    const id = req.params.id;
    if(!movies[id]) {
        res.status(401).send("Bad request - incorrect movie id")
        return;
    }
    movies = usuńElement(movies, id);
    res.send(movies)
    });

    

app.listen(3000, ()=> console.log('Running...'))