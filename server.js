const express = require('express')
const path = require('path')
const mysql = require('mysql2')


const app = express()
const db = mysql.createConnection({
 host: 'localhost',
 user: 'root',
 password: 'Password',
 database: 'fsongs_db'
})


app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Get all songs
app.get('/fsongs', (req, res)=>{
    db.query('SELECT * FROM fsongs',(e, fsongs)=>{
     if(e){
       console.log(e)
     }
        res.json(fsongs)
    })  
})

// Post a song
app.post('/fsongs',(req,res)=>{
 db.query(`INSERT INTO fsongs (title, artist) VALUES("${req.body.title} ",
  " ${req.body.artist}")`,e => {
      if(e){
          console.log(e)
      }
      res.sendStatus(200)
  })   
})

//Delete a song
app.delete('/fsongs/:title', (req, res)=>{
    db.query(`DELETE FROM fsongs WHERE title = "${req.params.title}"`, e=>{
        if(e){
            console.log(e)
        }
        res.sendStatus(200)
    })
})
app.listen(3000)