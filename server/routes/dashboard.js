const router=require("express").Router();
const pool=require("../db");
const authorization=require("../middlewares/authorization");

router.get("/",authorization,async(req,res)=>{
    try {
        // res.json(req.user);
        const users=await pool.query("SELECT user_name FROM users where user_id=$1",[req.user]);
        console.log(users)
        res.json(users.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
})
module.exports=router;