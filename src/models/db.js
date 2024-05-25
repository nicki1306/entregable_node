// db.js
import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://nickiicn:<gatito1306>@ecommerce.sxitpsr.mongodb.net/ecommercedb?retryWrites=true&w=majority', 
{ useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Conexión exitosa");
});

export default mongoose;
