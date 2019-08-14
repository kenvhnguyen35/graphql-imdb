const graphql = require('graphql');
const _ = require('lodash');

// use ES6 deconstructing syntax to grab what you need from the library
const { GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID, 
    GraphQLInt } = graphql;

// dummy data
var books = [
    { name: "Name of the wind", genre: "Fantasy", id: "1", author: "1"},
    { name: "The Final Empire", genre: "Fantasy", id: "2"},
    { name: "The long earth", genre: "Sci-fi", id: "3", author: "1"},
    { name: "Homo Deus", genre: "Non Fiction", id: "4"},
];
var authors = [
    { name: "Steven Danish", age: 45, id: "1"},
    { name: "Ana Paylor", age: 33, id: "2"},
    { name: "Michael Dawson", age: 56, id: "3"},
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: { type: AuthorType, 
            resolve(parent, args) { 
                return _.find(authors, { id: parent.author })
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({ 
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

const RouteQuery = new GraphQLObjectType({
    name: 'RouteQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args){ // resolve function is responsible for going out grapping data
                console.log(typeof(args.id))
                // code to get data from datasource using args.id
                return _.find(books, { id: args.id });
            }
        },
        // author: { 
        //     type: AuthorType,
        //     args: {id: { type: GraphQLID }},
        //     resolve(parent, args) {
        //         return _.find(authors, { id: args.id })
        //     }
        // }
    }
}); 

module.exports = new GraphQLSchema({
    query: RouteQuery
});