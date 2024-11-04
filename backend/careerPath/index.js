const express = require('express')
require('dotenv').config();
const cors = require('cors');
const leadProfileRoutes = require('./routes/leadsProfile.route');



const app = express()
app.use(cors());
app.use(express.json())

app.use('/api/leads', leadProfileRoutes);

app.get('/hello', (req,res)=>{
    res.send('Hello World!')
})

app.listen(3003, ()=>{
    console.log('Server Started at 3003')
})