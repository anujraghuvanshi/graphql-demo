import React, { Component, useState } from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks'
import BookDetail from './BookDetail'
import {getBooksQuery} from '../queries/query'


function BookList(props){

    const { loading, error, data } = useQuery(getBooksQuery);
    const [selectedBook, setSelectedBook] = useState('')


    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <div>
            book List
            
            <ul id="book-list">
            {data.books.map(book => (
                <li key={book.id} onClick={(e) => setSelectedBook(book.id) }>
                {book.name}
                </li>
            ))}
            </ul>
            
            <BookDetail bookId={selectedBook}/>
        </div>
    );
}

export default BookList;
