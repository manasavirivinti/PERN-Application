const Pool = require("pg").Pool;


const pool = new Pool({
    user:"postgres",
    password:"manasa@2005",
    host:"localhost",
    port:5432,
    database:"pernbooks"
});

module.exports=pool;