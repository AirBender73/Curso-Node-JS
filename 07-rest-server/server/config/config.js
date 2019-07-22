// PUERTO
process.env.PORT = process.env.PORT || 3000;

// ENV
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// VENCIMIENTO DEL TOKEN
process.env.CADUCIDAD_TOKEN = '48h';

// SEMILLA DE AUTENTICACIÓN
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

let urlDB;


if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URL_DB = urlDB;


// GOOGLE CLIENT ID
process.env.CLIENT_ID = process.env.CLIENT_ID || '960233552853-7fv6225mq5dbo0k16pvuhqmmev9kt22p.apps.googleusercontent.com';