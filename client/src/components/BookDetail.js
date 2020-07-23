import React, { Component } from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks'



const getBook = gql`
    query getBook($id: ID) {
        book (id: $id){
            id
            name
            genre

            author {
                id
                name
                
                books {
                    id
                    name
                    genre
                }
            }
        }
    }
`
function BookDetail(props){

    const { loading, error, data } = useQuery(getBook,{
        variables: {
            id: props.bookId
        }
    });

    
    if (loading) return <div id='book-details'><p>Loading...</p></div>;
    if (error) return <div id='book-details'>`Error! ${error.message}`</div>;
    
    const {book} = data
    return (
        <div id='book-details'>
            <h2>{book.name}</h2>
            <p>{book.genre}</p>
            <p>{book.author.name}</p>

            <p>All Book by this</p>

            <ul className='other-books'>
            {book.author.books.map(item => (
                <li key={item.id}>
                    {item.name}
                </li>
            ))}
            </ul>
        </div>
    );
}

export default BookDetail;
