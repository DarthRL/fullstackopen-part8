import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
    }
  }
`

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
      id
    }
    published
    genres
    id
  }
`

export const ALL_BOOKS = gql`
  query allBooks($genre: String, $author:String){
    allBooks(genre: $genre, author: $author) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres:[String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author {
        name
        id
      }
      genres
      id
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo:Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`