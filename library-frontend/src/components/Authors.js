import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import { useState } from 'react'
import Select from 'react-select'

const Authors = props => {
  const [nameOption, setNameOption] = useState(null)
  const [born, setBorn] = useState('')
  const result = useQuery(ALL_AUTHORS)
  const [changeBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors

  const submit = event => {
    event.preventDefault()
    if (!nameOption) return

    changeBorn({
      variables: { name: nameOption.value, setBornTo: parseInt(born) },
    })

    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Set birthyear</h3>
        <form onSubmit={submit}>
          <Select
            defaultValue={nameOption}
            onChange={setNameOption}
            options={authors.map(a => ({ value: a.name, label: a.name }))}
          ></Select>
          <div>
            born
            <input
              type='number'
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            ></input>
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
