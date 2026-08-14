// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',     // <-- cambia esto
    database: 'tuchin_turismo'         // <-- cambia esto si tu base de datos tiene otro nombre
});

connection.connect((err) => {
    if (err) {
        console.error('❌ Error de conexión a MySQL:', err);
    } else {
        console.log('✅ Conexión exitosa a MySQL.');
    }
});

module.exports = connection;
