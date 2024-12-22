const express = require('express');
const path = require('path');
const fs = require('fs');




const csvFilePath = path.join(__dirname, 'data-formula/ivf_success_formulas.js');
if (!fs.existsSync(csvFilePath)) {
    console.error('[31m%s[0m', 'Error file not avalable: ivf_success_formulas.js');
    console.error('\x1b[32m%s\x1b[0m', 'run command: node process-csv.js');
    process.exit(1);
}

const {calculateIVFScore} = require('./utills/logic');
const formulas = require('./data-formula/ivf_success_formulas.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Set the directory for EJS files (optional, defaults to './views')
app.set('views', './views');

// Serve static files (optional)
app.use(express.static('public'));



// Define routes
app.get('/', (req, res) => {
    const data = { 
        title: 'Welcome', 
        message: 'Hello, EJS!' ,
        user: { name: 'John Doe', age: 30 },
    };
    res.render('index', data);
});


// Define routes
app.post('/api/calculate', async(req, res) => {
    try{
        const userData = req.body
        const result = await calculateIVFScore(userData, formulas)
        res.json(result)
    }catch(err){
        res.status(500).json({message: err.message})
    }
    
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
