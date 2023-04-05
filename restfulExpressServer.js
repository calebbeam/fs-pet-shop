//node pg docs: https://node-postgres.com/
//pg express docs: https://expressjs.com/en/guide/database-integration.html#postgresql
//express docs: https://devdocs.io/express/
//pg docs: https://www.postgresql.org/docs/
const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
app.use(express.json())

const PORT =  process.env.PORT || 5000

const { Pool } = require('pg')
const pool = new Pool({connectionString: process.env.CONNECTION_STRING })

pool.connect();


//start requests here dummy

app.listen(PORT, () =>{
    console.log(`listening on ${PORT}`)
})