const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    console.log("HELLO")
    return res.send('Hello World!')
})

app.listen(port, ()=> {
    console.log("listening on ", port)
})

module.export = app;
