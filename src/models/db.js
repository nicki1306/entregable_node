// db.js
import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://nicki:<gatito13>@cluster0.sxitpsr.mongodb.net/ecommerce', 
{ useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Conexión exitosa");
});

export default mongoose;
