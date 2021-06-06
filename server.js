const express = require('express')
const path = require('path')

const app = express()
let songs=[
    {
        title: 'Thunderstruck',
        artist: 'ACDC'
    },
    {
        title: 'Dancing Queen',
        artist: 'ABBA'
    }
]

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Get all songs
app.get('/songs', (req, res)=>{
    res.json(songs)

})

// Post a song
app.post('/songs',(req,res)=>{
//req body
    songs.push(req.body)
    res.sendStatus(200)
})


//Delete a song
app.delete('/songs/:title', (req, res)=>{
    //req.params.title
    songs = songs.filter(song=>song.title != req.params.title)
    res.sendStatus(200)
})

app.listen(3000)