const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const path = require("path");


const apiRouter = require('./routers/zing')
app.use('/api',apiRouter);


app.use(express.static(path.join(__dirname, "client/build"))); // set static file
app.get('/',(req,res)=>{
    res.sendFile(`index.html`)
})

app.listen(port, ()=>{
    // console.log(`http://localhost:${port}`)
})