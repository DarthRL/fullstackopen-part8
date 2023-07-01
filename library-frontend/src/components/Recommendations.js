import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = props => {
  const meResult = useQuery(ME)
  const booksResult = useQuery(ALL_BOOKS, {
    variables: {  genre: meResult.loading ? null : meResult.data.me.favoriteGenre },
    skip: meResult.loading,
  })

  if (!props.show) {
    return null
  }

  if (booksResult.loading || meResult.loading) {
    return null
  }

  const filteredBooks = booksResult.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre {meResult.data.me.favoriteGenre}</p>
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
