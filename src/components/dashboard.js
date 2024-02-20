import {React,Fragment,useEffect,useState} from "react";
import EditBook from "./EditBook";

const Dashboard=({setAuth})=>{
    const [name,setName]=useState("")
    const [Tpages,setTpages]=useState(0);

    async function getName(){
        try {
            const response=await fetch("http://localhost:5000/dashboard",{
                method:"GET",
                headers:{token:localStorage.token}
            });
            
            const parseRes=await response.json()
            // console.log(parseRes)
             setName(parseRes.user_name);
             setAuth(true);

        } catch (err) {
            console.error(err.message);
        }
    }
    const calculateTotalPages = async () => {
        try {
            const response = await fetch(`http://localhost:5000/count`);
            const data = await response.json();
            const Tpages = Math.ceil(parseInt(data) / Count);
            setTpages(Tpages);
            // console.log(Tpages);
        } catch (err) {
            console.error(err.message);
        }
    };
    
    useEffect(() => {
        calculateTotalPages();
    }, []);
    const logout=(e)=>{
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    }

    useEffect(()=>{
        getName();
    },[]);

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
        if(pageNum < Tpages){
            setPageNum(prevPage=>prevPage+1);
        }
    };

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
            {/* <h1>Dashboard {name}</h1> */}
            <button className="btn btn-primary mt-5" onClick={e=>logout(e)}>Logout</button>
            {/* /pagenation code */}
            <h1 className="text-center mt-5">{name} Books List</h1>
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
                <button className="btn btn-warning" disabled={pageNum === 1} onClick={handlePrev}>Previous</button>
                <button className="btn btn-warning" disabled={pageNum === Tpages} onClick={handleNext}>Next</button>
            </div>
        </Fragment>
     );
};

export default Dashboard;
