import React, { Fragment, useEffect, useState } from "react";
import EditBook from "./EditBook.js";

const ListBooks = () => {
    const [books, setBooks] = useState([]);
    const deleteBook = async (id) => {
        try {
            const deleteBook = await fetch(`http://localhost:5000/books/${id}`, {
                method: "DELETE"
            });
            setBooks(books.filter(book => book.book_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    const getBooks = async () => {
        try {
            const response = await fetch(`http://localhost:5000/books`);
            const jsonData = await response.json();
            setBooks(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }
    

    useEffect(() => {
        getBooks();
    }, []); // Fetch all books when the component mounts

    return (
        <Fragment>
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
                                <button className="btn btn-danger"
                                onClick={() => deleteBook(book.book_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                        </tbody>
                    </table>
        </Fragment>
    )
};

export default ListBooks;
