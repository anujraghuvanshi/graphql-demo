import React, { Component, useState} from 'react';
import gql from 'graphql-tag';
import {useQuery, useMutation} from '@apollo/react-hooks'
import {addBookMutation, getAuthorsQuery, getBooksQuery} from '../queries/query'



function AddBook(){
    
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState(0);

    const [addBook, { bookData }] = useMutation(addBookMutation);

    const { loading, error, data } = useQuery(getAuthorsQuery);

    const submitForm = (e) => {
        e.preventDefault()
        console.log({name, genre, authorId});
        addBook({
            variables: {
                name, genre, authorId
            },
            refetchQueries: [{
                query: getBooksQuery
            }]
        })
    };

    if (loading) return <p>Loading...</p>;
    if (error) return `Error! ${error.message}`;

    return (
        <form id="add-book" onSubmit={submitForm}>
            <div className="field">
                <label>Book Name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="field">
                <label>Genre Name:</label>
                <input type="text" onChange={(e) => setGenre(e.target.value)}/>
            </div>


            <div className="field">
                <label>Author:</label>
                <select onChange={(e) => setAuthorId(e.target.value)}>
                    <option>Select Author</option>
                    {data.authors.map(author => (
                        <option key={author.id} value={author.id}>
                        {author.name}
                        </option>
                    ))}
                </select>
            </div>

            <button>+</button>
        </form>
    );
}

export default AddBook;
