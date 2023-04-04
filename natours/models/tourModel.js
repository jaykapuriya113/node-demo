const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour name'],
      //  unique:false,
      trim: true,
      maxlength: [40, 'A tour name have less or eual 40'],
      minlength: [10, 'A tour name have more or eual 10'],
      //  validate:[validator.isAlpha,"only character"]
    },
    // slug:String,

    duration: {
      type: Number,
      // required:[true,'a tour must have duration']
    },
    maxGroupSize: {
      type: Number,
      // required:[true,'a tour must have group size']
    },
    difficulty: {
      type: String,
      // required:[true,'a tour must have diff'],
      enum: {
        values: ['easy', 'medium', 'difficulty'],
        message: 'difficulty is either: easy,medium,difficult',
      },
    },
    ratingsAvrage: {
      type: Number,
      default: 4.5,
      min: [1, 'rating must bove 1'],
      max: [5, 'rating must bove 5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      require: [true, 'A tour price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'discount not avilable',
      },
    },
    summary: {
      type: String,
      trim: true,
      require: [true, 'A tour des'],
    },
    descripton: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [false, 'A tour have img'],
    },
    image: [String],
    createAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre("save",function(next){
//     console.log("will save document");
//     next();
// });

// tourSchema.post("save",function(doc,next){
//     console.log(doc);
//     next();
// })
tourSchema.pre(/^find/, function (next) {
  // tourSchema.pre("find",function(next){
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milisecond`);
  console.log(docs);
  next();
});
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
