const { nanoId } = require('nanoid');
const books = require('./books.js');

const addBookHandler = (request, h) => {

    // Body Request
    const {
        name,
        year,
        publisher,
        summary,
        pageCount,
        readPage,
        reading
    } = request.payload;

        // validasi untuk mengeceh apakah nama bukunya ada atau tidak
        if (!name) {
        // Body Response
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku, Mohon isi nama buku"
        }).code(400);
        return response;
    }

        // 
        if (readPage > pageCount) {
            const response = h.response({
                status: "Fail",
                message: "Gagal menambahkan buku. halaman yang dibaca tidak boleh lebih besar dari total halaman buku"
            }).code(400)
            return response;
        }
        
            const id = nanoId(16);
            const finished = pageCount === readPage;
            const insertedAt = new Date().toISOString();
            const updatedAt = insertedAt;

            const newBook = {
                id,
                name,
                year,
                author,
                summary,
                publisher,
                pageCount,
                readPage,
                finished,
                reading,
                insertedAt,
                updatedAt,
            };
            
            books.push(newBook); // ---> push data ke array books

            const isSuccess = books.filter((note) => note.id === id).length > 0; // ---> cek apakah data berhasil di push

            if (isSuccess) {
                const response = h.response({
                    status: "Success",
                    Message: "Buku berhasil ditambahkan",
                    data: {
                        bookId: bookId,
                    },
                });
                response.code(201)
                return response;
            }

            const response = h.response({
                status: "Fail",
                message: "Buku gagal ditambahkan",
            }).code(500)
            return response;   
        };
    
    const getBookHandler = (request, h) => {

        const { nama, reading, finished } = request.query;

        // Validasi untuk mengecek apakah query parameter name, reading, dan finished ada atau tidak
    if (!nama, !reading, !finished) {

        const simplifiedBooks = books.map((book) => ({
            id: book.id,
            nama: book.nama,
            publisher: book.publisher,
        }))
    
        const response = h.response({
            status: 'success',
            data: {
                books: simplifiedBooks,
            },
        }).code(200)

        return response;

    }

    if (nama) {

        const filteredBooksName = books.filter((book) => {
            const namaRegex = new RegExp(nama, 'gi');
            return namaRegex.test(book.name)
        });

        const response = h.response({
            status: "Success",
            data: {
                books: filteredBooksName.map((book) => ({
                    id: book.id,
                    nama: book.nama,
                    publisher: book.publisher,
                })),
            },
        }).code(200)

        return response;
    }

    if (reading) {

        const filteredBookReading = books.filter((book) => {
            Number(book.reading) === Number(reading)
        })

        const response = h.response({
            status: 'Success' ,
            data: {
              books: filteredBookReading.map((book) => ({
                id: book.id,
                nama: book.nama,
                publisher: book.publisher,
              }))
            },
        }).code(200)

        return response;
    }

    if (finished) {

        const filteredFinishedBooks = books.filter((book) => {
            Number(book.finished) === Number(finished)
        })

        const response = h.response({
            status: 'Success',
            data: {
                books: filteredFinishedBooks.map((book) => ({
                    id: book.id,
                    nama: book.nama,
                    publisher: book.publisher,
                })),
            },
        }).code(200)

        return response;
    }

    };

    const getBookByIdHandler = (request, h) => {
        const { bookId } = request.params;
        const book = books.find((book) => book.id === bookId)

        if (book) {
            const response = h.response({
                status: "Success",
                data: book,
            }).code(200)

            return response;
        }

        if (!book) {
            const response = h.response({
                status: "fail",
                message: "Buku tidak ditemukan"
            })
            response.code(404)
            return response;
        }


        return {
            status: 'success',
            data: {
                book,
            },
        };
    };

    const updateBookHandler = (request, h) => {
        const {bookId} = request.params;

        const {
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
        } = request.payload;

        if (!name) {
            const response = h.response({
                status: "fail",
                message: "Gagal memperbarui data buku, mohon isi nama buku terlebih dahulu"
            }).code(400)

            return response;
        }

        if (readPage > pageCount) {
            const response = h.response({
                status: "fail",
                message: "Gagal memperbarui data buku, readPage tidak boleh lebih besar dari pageCount"
            }).code(400)

            return response;
        }

        const updatedAt = new Date().toISOString();
        const finished = pageCount === readPage;

        const index = books.findIndex((book) => book.id === bookId);

        if (index !== -1) {

            books[index] = {
                ...books[index],
                name,
                year,
                author,
                summary,
                publisher,
                pageCount,
                readPage, 
                finished,
                reading,
                updatedAt,
            };
            
            const response = h.response({
                status: "Success",
                message: "Data buku berhasil diperbarui"
            }).code(200)

            return response;
        }

        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui data buku, id tidak ditemukan',
        }).code(404)

        return response;
    };

    const deleteBookHandler = (request, h) => {
        const { bookId } = request.params;

        const index = books.findIndex((book) => book.id === bookId);

        if (index !== -1) {

            books.splice(index, 1);

            const response = h.response({
                status: 'Success',
                message: 'Buku berhasil dihapus'
            });
            response.code(200);
            return response;
        }

        const response = h.response({
            status: "Gagal",
            message: 'Gagal menghapus buku. Id tidak ditemukan'
        }).code(404)

        return response;
    };

    module.exports = {
        addBookHandler,
        getBookHandler,
        getBookByIdHandler,
        updateBookHandler,
        deleteBookHandler
    }