const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mark1234',
    database: 'crud'
});


//create
app.post("/api/create", (req, res) => {
    const {DESCRIPTION, WEBSITE, EMAIL, PASSWORD, DATE} = req.body;
    const sql = "INSERT INTO ACCOUNTS (DESCRIPTION, WEBSITE, EMAIL, PASSWORD, DATE) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [DESCRIPTION, WEBSITE, EMAIL, PASSWORD, DATE], (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
//read
app.get("/api/read", (req, res) => {
    const sql = "SELECT * FROM ACCOUNTS";
    db.query(sql, (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    })
})
//update
app.put('/api/update', (req, res) => {
    const {ID, DESCRIPTION, WEBSITE, EMAIL, PASSWORD, DATE} = req.body;
    db.query(
        `update accounts set DESCRIPTION = "${DESCRIPTION}", WEBSITE = "${WEBSITE}", EMAIL = "${EMAIL}", PASSWORD = "${PASSWORD}", DATE = "${DATE}" where ID=${ID}`,
        [DESCRIPTION, WEBSITE, EMAIL, PASSWORD, DATE], (err, result) => {
            if(err){
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
});
//delete
app.delete('/api/delete/:ID', (req, res) => {
    const ID = req.params.ID
    db.query(
        'DELETE FROM ACCOUNTS WHERE ID = ?', ID, (err, result) => {
            if(err) {
                console.log(err)
            } else{
                res.send(result)
            }
        }
    )
});


app.listen(3001, () => {
    console.log('running...');
})