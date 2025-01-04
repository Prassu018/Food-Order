import React, { useEffect, useState }  from  'react';
import axios from 'axios';

const avgRating =({foodId}) =>{
    const [avgRating,setAvgRating] = useState(null);
    const [totalReviews,setTotalReviews] = useState(0);

    useEffect(()=>{
        const fetcthavgRating = async()=>{
            try{
                const response = await axios.get();
                setAvgRating(response.data.avgRating);
                setTotalReviews(response.data.totalReviews);
            }
            catch(error){
                console.error(error);
            }
        };
        fetcthavgRating();
    },[foodId]);
    return(
        <div>
            {avgRating !==null?(
                <p>Average Rating:{avgRating}/5({totalReviews}reviews)</p>
            ):(
                <p>No reviews yet</p>
            )}
        </div>
    );
}

export default avgRating;