const express=require("express")
const app=express()
const cors=require("cors")
const pool = require("./db");

// middle ware
app.use(cors());
app.use(express.json());

//ROUTES//

//register and login routes
app.use("/auth",require("./routes/jwtAuth"));

//dashboard route
app.use("/dashboard",require("./routes/dashboard"));
//create a book

app.post("/books",async(req,res)=>{
    try{

        const {description} = req.body;
        const newBook=await pool.query("INSERT INTO books (description) VALUES($1) RETURNING *",
        [description]);
        res.json(newBook.rows);

    }catch(err){
        console.error(err.message)
    }
})

//get a book by id
app.get("/books/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const books = await pool.query("SELECT * FROM books WHERE book_id=$1",[id]) 
        res.json(books.rows);   
    
    } catch (err) {
        console.error(err.message);
    }
})

// pagination route
app.get("/books/:limit/:offset",async(req,res)=>{
    try {
        const {limit}=req.params;
        const {offset}=req.params;
        const data=await pool.query("Select * from books LIMIT $1 OFFSET $2",[limit,offset]);
        res.json(data.rows);
    } catch (err) {
        console.error(err.message);
    }
})
//update a book 
app.put("/books/:id",async(req,res)=>{
    try {
        const {id} =req.params;
        const {description} = req.body;
        const updateBook = await pool.query("UPDATE books SET description = $1 WHERE book_id=$2",
        [description,id]);

        res.json("Book was updated");
    } catch (err) {
        console.error(err.message);
    }
})
//delete a book 

app.delete("/books/:id",async(req,res)=>{
    try {
        const {id} =req.params;
        const deleteBook = await pool.query("DELETE FROM books WHERE book_id=$1",
        [id]);
        res.json("Book was deleted");
    } catch (err) {
        console.error(err.message);
    }
})


//get all books

app.get("/books",async(req,res)=>{
    try {
        const allBooks=await pool.query("SELECT * FROM books");
        res.json(allBooks.rows);
    } catch (err) {
        console.log(err.message);
    }
})
//get books count 
app.get('/count', async (req, res) => {
    // Here you would query your database or whatever data source you have
    // to get the total count of books
    
        try {
            const allBooks=await pool.query("SELECT count(*) FROM books");
            res.json(allBooks.rows[0].count);
        } catch (error) {
            console.error('Error executing query: ', error)
        }
    });
    // getCountFromTable('users')
    // .then(count => {
    //     console.log('Count of records:', count);
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });
    // res.json({ count });

app.listen(5000,()=>{
    console.log("server has started");
});