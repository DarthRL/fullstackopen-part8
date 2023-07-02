import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm.js'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommendations from './components/Recommendations'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

export const uniqById = a => {
  let seen = new Set()
  return a.filter(item => {
    let k = item.id
    return seen.has(k) ? false : seen.add(k)
  })
}

export const updateBookCache = (cache, addedBook) => {
  cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
    return {
      allBooks: uniqById(allBooks.concat(addedBook)),
    }
  })
  for (const genre of addedBook.genres) {
    cache.updateQuery(
      { query: ALL_BOOKS, variables: { genre: genre } },
      ({ allBooks }) => {
        return {
          allBooks: uniqById(allBooks.concat(addedBook)),
        }
      }
    )
  }
  cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
    return {
      allAuthors: uniqById(allAuthors.concat(addedBook.author)),
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    setToken(token)
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      window.alert(`new book ${data.data.bookAdded.title} added`)
      const bookAdded = data.data.bookAdded
      updateBookCache(client.cache, bookAdded)
    },
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  if (token === null) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors show={page === 'authors'} />

        <Books show={page === 'books'} />

        <LoginForm setToken={setToken} show={page === 'login'} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommendations show={page === 'recommendations'} />
    </div>
  )
}

export default App
