const express = require('express')
const Datastore = require('nedb')
const app = express()
app.listen(3000, () => console.log('listening at 3000'))

const database = new Datastore('database.db')
database.loadDatabase()
// database.insert({name: 'Redon', status: 'suicidal'})

app.use(express.static('public'))
app.use(express.json({limit: '1mb'}))

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if(err){
            response.end();
            return;
        }
        response.json(data)
    })
})


app.post('/api', (request, response) => {
    console.log(request.body)
    const timestamp = Date.now()
    request.body.timestamp = timestamp
    database.insert(request.body)
    response.json(request.body)
})

