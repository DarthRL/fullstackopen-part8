import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = props => {
  const allResult = useQuery(ALL_BOOKS)
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading || allResult.loading) {
    return null
  }

  const allBooks = allResult.data.allBooks
  const books = result.data.allBooks

  const genres = Array.from(new Set(allBooks.map(b => b.genres).flat()))

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
