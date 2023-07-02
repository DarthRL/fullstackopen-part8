const DataLoader = require('dataloader')
const Book = require('./models/book')

const bookCountLoader = new DataLoader(async authorIds => {
  const books = await Book.find({})
  return authorIds.map(id => {
    const booksByAuthor = books.filter(b => b.author.toString() === id)
    return booksByAuthor.length
  })
})

module.exports = { bookCountLoader }
