const AppError = require("../utils/appError");
const Tour=require("./../models/tourModel");
const APIFeatures=require("./../utils/apiFeatures");
const catchAsync=require("./../utils/catchAsync");


    exports.aliasTopTours=(req,res,next)=>{
        req.query.limit="5";
        req.query.sort="-ratingsAvrage,price";
        req.query.fields="name,price,ratingsAvrage,summary,difficulty";
        next();
    };
    
    exports.getAllTours=catchAsync(async (req,res,next)=>{
       
            const features=new APIFeatures(Tour.find(),req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
            // difficulty=easy&duration[gte]=5&price[lt]=1500&limit=5
    const tours=await features.query;
  
        res.status(200)
        .json({
          status:"success",
          result:tours.length,
          data:{
             tours
          }
        })  
    })
    exports.getTour=catchAsync(async (req,res,next)=>{
      
         const tour=await Tour.findById(req.params.id);

         if(!tour){
            return next(new AppError("No tour found with that ID",404))
         }
         res.status(200)
         .json({
           status:"success",
           result:tour.length,
           data:{
              tour
           }
         })  
     })
 
    exports.createTour=catchAsync(async (req,res,next)=>{
        const newTour= await Tour.create(req.body);
        res.status(200)
         .json({
           status:"success",
           result:newTour.length,
           data:{
            newTour
           }
         }) 
       
      
    });

    exports.updateTour=catchAsync(async(req,res,next)=>{
    console.log(req.query);
        const tour=await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
        });

        if(!tour){
            return next(new AppError("No tour found with that ID",404))
         }
     res.status(200).json({
         status:"success",
         data:{
             tour
         }
     })
   
    
})
    exports.deleteTour=catchAsync(async (req,res,next)=>{
      
            const tour=await Tour.findByIdAndDelete(req.params.id);
            console.log(req.params.id)  
    
            if(!tour){
                return next(new AppError("No tour found with that ID",404))
             }      
        res.status(204).json({
         status:"success",
         data:null
     })
    
})
exports.getTourStats=catchAsync(async (req,res,next)=>{
 
        const stats=await Tour.aggregate([
           {
            $match:{ratingsAvrage : {$gte:4.5}}
           },
           {
            $group:{
                _id:{$toUpper: '$difficulty'},
                numTours:{$sum:1},
                numRatings:{$sum: "$ratingsQuantity"},
                avgRating: {$avg: "$ratingsAvrage"},
                avgPrice:{$avg: "$price"},
                minPrice: {$min: "$price" },
                maxprice:{$max:"$price"}
            }
        },
        {
            $sort: {avgPrice:1}
            },
        //    {
        //     $match: {_id: {$ne: "EASY"}}
        //    }
        ]);
        res.status(200).json({
            status:"success",
            data:{
                stats
            }
        })
  
})

exports.getMonthlyPlan=catchAsync(async (req,res,next)=>{
    
        const year=req.params.year*1;
        const plan=await Tour.aggregate([
            {
                $unwind: "$startDates"
            },
            {
                $match :{
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`),
                    }
                }
            },
            {
                $group:{
                    _id: {$month: "$startDates"},
                    numToursStarts:{ $sum:1},
                    tours: {$push: "$name"}
                }
            },{
                $addFields: {
                    month: "$_id"
                }
            },{
                $project: {
                    _id:0
                }
            },{
                $sort: { numToursStarts:-1}
            },{
                $limit: 12
            }
        ]);
        res.status(200).json({
            status:"success",
            data:{
                plan
            }
        })
    })