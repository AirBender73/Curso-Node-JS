// PUERTO
process.env.PORT = process.env.PORT || 3000;

//ENTORNO
process.env.PORT = process.env.PORT || 3000;

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://david:WZ0Zdv86tF5tKPoU@cluster0-jdbth.mongodb.net/cafe'
}

process.env.URL_DB = urlDB;