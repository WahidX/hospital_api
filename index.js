const express = require('express');
const app = express();
const port = 8000;
const db = require('./configs/mongoose');




app.use(express.urlencoded());
app.use(express.json());


app.use('/', require('./routes'));


app.listen(port, function(err){
    if(err){ console.log('Error while running the server:',err);}

    console.log('Server running at :',port);
})