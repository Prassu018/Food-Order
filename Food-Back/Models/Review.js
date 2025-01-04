app.get('/api/foods/:foodId/average-rating',async(req,res)=>{
    const {foodId} = req.params;
    try{
        const result = await Review.aggregate([
            {$match:{foodId:mongoose.Types.objectId(foodId)}},
            {$group:{_id:"$foodId",avgrating:{avg:"$rating"} ,count:{$sum:1}}}
        ]);
    if(result.length>0){
        const{avgrating,count} = result[0];
        res.json({avgrating:avgrating.tofixed(1),totalReviews:count});
    }
    else{
        res.json({avgrating:null,totalReviews:0});
    }
    }
    catch(error){
        console.log(error);
    }
})