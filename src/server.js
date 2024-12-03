// File ini berfungsi untuk menginisialisasi server Hapi 
const hapi = require('@hapi/hapi');
const routes = require('./routes');

// Function yang berfungsi untuk konfigurasi server
const init =  async () => {

    const server = hapi.server({
        port: 9000,
        host: 'localhost',
    })

    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`)
};

init();

