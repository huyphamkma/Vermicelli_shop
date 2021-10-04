const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://test:admin@cluster0.3hf1h.mongodb.net/vermicelli?retryWrites=true&w=majority'),{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        console.log('Connect db succesfully')
    } catch (error) {
        console.log('Connect db failure')
    }
}

module.exports = {connect}