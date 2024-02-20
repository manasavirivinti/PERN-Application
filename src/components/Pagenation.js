import {React,Fragment,useEffect,useState} from "react";
import EditBook from "./EditBook";

function Pagenation(){
    const [pageNum,setPageNum]=useState(1);
    const [books,setBooks]=useState([]);
    const Count=5;
    const deleteBook=async(id)=>{
        try {
            const deleteBook=await fetch(`http://localhost:5000/books/${id}`,{
                method:"DELETE"
            })
            setBooks(books.filter(book=>(book.book_id!==id)))
        } catch (err) {
            console.error(err.message);
        }
    };
    const getData=async(Count,offset)=>{
        try {
            const response=await fetch(`http://localhost:5000/books/${Count}/${offset}`);
            const data=await response.json();
            setBooks(data);
        } catch (err) {
            console.error(err.message);
        }
    }
    const handlePrev=()=>{
        setPageNum((prevPage)=>prevPage-1);
    }
    const handleNext=()=>{
        setPageNum((prevPage)=>prevPage+1);
    }
    useEffect(()=>{
        const offset=(pageNum-1)*Count;
        getData(Count,offset);
    },[pageNum,Count]);
    const [description,setDescription]=useState("")
    const onSubmitForm =async e =>{
        e.preventDefault();
        try {
            const body={description};
            const response = await fetch("http://localhost:5000/books",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            });
            
            window.location="/";

        } catch (err) {
            console.error(err.message);
        }
    }
    
    return(
        <Fragment>
            <h1 className="text-center mt-5">Pern Books List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input 
                    type="text" 
                    className="form-control" 
                    value={description} 
                    onChange={e=>setDescription(e.target.value)}/>
                <button className="btn btn-success">Add a Book</button>
            </form>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.book_id}>
                            <td>{book.description}</td>
                            <td><EditBook book={book} /></td>
                            <td>
                                <button onClick={() => deleteBook(book.book_id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mb-5 d-flex justify-content-between">
                <button className="btn btn-warning" disabled={(pageNum===1)} onClick={handlePrev}>Previous</button>
                <button className="btn btn-warning" onClick={handleNext}>Next</button>
            </div>
        </Fragment>
    )
}

export default Pagenation;