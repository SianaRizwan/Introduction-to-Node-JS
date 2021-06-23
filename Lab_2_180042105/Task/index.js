const app = require('./app');
const dbConnect = require("./model/dbConnect");
require('dotenv').config();

const PORT = process.env.PORT;
dbConnect();

app.listen(PORT,()=> {
    console.log (`Server is running at port ${PORT}`);
});