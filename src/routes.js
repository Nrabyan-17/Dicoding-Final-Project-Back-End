// File ini berfungsi untuk mendefinisikan setiap route yang akan digunakan oleh server Hapi.

const {
    addBookHandler,
    getBookHandler,
    getBookByIdHandler,
    updateBookHandler,
    deleteBookHandler,
} = require('./handler.js')

const routes = [
    {
        method: "POST",
        path: '/books',
        handler: addBookHandler,
    },

    {
        method: "GET",
        path: '/books',
        handler: getBookHandler,
    },

    {
        method: "GET",
        path: '/books/${bookId}',
        handler: getBookByIdHandler,
    },

    {
        method: "PUT",
        path: '/books/${bookId}',
        handler: updateBookHandler,
    },

    {
        method: "DELETE",
        path: '/books/${booksId}',
        handler: deleteBookHandler
    },
]

module.exports = routes;