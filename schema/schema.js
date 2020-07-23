const graphql = require('graphql')
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql

// dummy data
var books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' },
    { name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2' },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3' },
    { name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3' },
    { name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3' },
];

var authors = [
    {name: "author 1", age: '4', id: '1'},
    {name: "author 2", age: '45', id: '2'},
    {name: "author 3", age: '54', id: '3'},
]


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){

                
                // return _.find(authors, {id: parent.authorId});
                return Author.findById(parent.authorId);
            }
        }
    })
})


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLString},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
            //    return  _.filter(books, {authorId: parent.id});
                return Book.find({ authorId: parent.id });

            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        books: {
            type: new GraphQLList(BookType),
            args: {},
            resolve(parent, args){
                // return books;
                // return books
                return Book.find({});
            }
        },

        authors: {
            type: new GraphQLList(AuthorType),
            args: {},
            resolve(parent, args){
                // return books;
                // return authors;
                return Author.find({});
            }
        },

        book: {
            type: BookType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args) {
                // code to return single book
            //    return  _.find(books, {id: args.id});
               return Book.findById(args.id);
            }
        },

        author: {
            type: AuthorType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args) {
                // code to return single book
            //    return  _.find(authors, {id: args.id});
                return Author.findById(args.id);
            }
        }
    }
    
})


const Mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLString },
            },
            resolve(parent, args) {
                
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save()
                
            }
        },

        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLString) },
                
            },
            resolve(parent, args) {
                
                let author = new Author(args);
                return author.save()
                
            }
        },
        
    }
    
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
})