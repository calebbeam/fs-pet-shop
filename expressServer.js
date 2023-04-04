const express = require('express');
const fs =require('fs')
const app = express();
const port = process.env.port || 8000


app.get('/',(req,res)=> {
    res.send('Welcome to the Pet Shop')
})

app.get('/pets',(req,res)=> {
    fs.readFile('pets.json', 'utf-8', (error, pets) => {
        if(error){
            res.error(error)
        } else {
            res.json(JSON.parse(pets))
            res.status(200)
            res.end()
        }
    })
})

// app.get('/pets/:petId',(req,res)=> {
//     fs.readFile('pets.json', 'utf-8', (error, petsString) => {
//         if(error){
//             res.error(error)
//         } else {
//             let pets = (JSON.parse(petsString))
//             res.json(pets[req.params.petId])
//             res.status(200)
//             res.end()
//         }
//     })
// })

app.get('/pets/:petId',(req,res) => {
    fs.readFile('pets.json', 'utf-8', (error, petsString) => {
        if(error){
            res.sendStatus(500)
            res.end()
        } else {
            let pets = (JSON.parse(petsString))
            if (!pets[req.params.petId]) {
                res.sendStatus(404, "Not Found")
            }
            else {
                res.json(pets[req.params.petId])
                res.status(200)
                res.end()    
            }
        }
    })
})


app.listen(port, () => {
    console.log(`server listening on port:${port}`)
})
