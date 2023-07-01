import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = props => {
  const booksResult = useQuery(ALL_BOOKS)
  const meResult = useQuery(ME)

  if (!props.show) {
    return null
  }

  if (booksResult.loading || meResult.loading) {
    return null
  }

  const books = booksResult.data.allBooks

  const genre = meResult.data.me.favoriteGenre

  const filteredBooks = books.filter(b => b.genres.includes(genre))
  
  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre {genre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
