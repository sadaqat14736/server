const express = require("express");
const testRouter = require("./router/route");  
const dbCon = require("./db/dbConnection");


const PORT = 5000 || process.env.PORT;

const app = express();


app.use(express.json());
dbCon();

app.use("/api", testRouter);

app.get('/', (req, res) => {
    res.send('hello world server is running ');
});




app.listen(PORT, () => {
    console.log(`server is running, http://localhost:${PORT}`);
});