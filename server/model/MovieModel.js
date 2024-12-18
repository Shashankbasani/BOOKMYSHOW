const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title:{type:String, required: true},
    description:{type:String, required: true},
    duration:{type:Number, required: true},
    genere:{type:String, required: true},
    releaseDate:{type:Date, required: true,
        set: (value) => {
            const date = new Date(value);
            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
          },
    },
    poster:{type:String, required: true},
    language:{type:String, required: true},

})

const MovieModel = mongoose.model("movies", MovieSchema);

module.exports = MovieModel;