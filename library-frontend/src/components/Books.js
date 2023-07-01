import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useEffect, useState } from 'react'

const Books = props => {
  const [genres, setGenres] = useState([])
  const result = useQuery(ALL_BOOKS)
  useEffect(() => {
    if (!result.loading)
      setGenres(
        Array.from(
          new Set(genres.concat(result.data.allBooks.map(b => b.genres).flat()))
        )
      )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return null
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((g, index) => (
          <button
            key={index}
            onClick={() => {
              result.refetch({ genre: g })
            }}
          >
            {g}
          </button>
        ))}
        <button
          onClick={() => {
            result.refetch({ genre: null })
          }}
        >
          all genres
        </button>
      </div>
    </div>
  )
}

export default Books
