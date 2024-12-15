import React, { useEffect, useState } from 'react'
import classess from './foodPage.module.css'
import { useParams } from 'react-router-dom';
import { getById } from '../../services/foodServices';
import StarRating from '../../components/StarRating/StarRating';
import Tags from '../../components/Tags/Tags';
import Price from '../../components/Price/Price';
export default function FoodPage() {
    const [food, setFood] = useState({});
    const {id} = useParams();

    useEffect(() => {
        getById(id).then(setFood);
    }, [id]);
  return (
  <>
  { food && (
     <div className={classess.container}>
    <img
    className={classess.image}
    src={`/foods/${food.imageUrl}`}
    alt={food.name}
    />

    <div className={classess.details}>
       <div className={classess.header}>
            <span className={classess.name}>{food.name}</span>
            <span 
            className={`${classess.favorite} ${
                food.favorite? '': classess.not
                }`}
                >
            ❤
            </span>
        </div>
         <div className={classess.rating}>
            <StarRating stars={food.stars} size={25} />
         </div>
         <div className={classess.origins}>
            {food.origins?.map(origin => (
                <span key={origin}>{origin}</span>
            ))}
         </div>
         <div className={classess.tags}>
          {food.tags && (
            <Tags 
            tags={food.tags.map(tag => ({ name: tag }))} 
            forFoodPage={true}
            />
          )}
         </div>
          
          <div className={classess.cook_time}>
            <span>
              Time to cook about <strong>{food.cookTime}</strong> minutes
            </span>
          </div>
          <div className={classess.price}>
            <Price price={food.price} />
          </div>
          <button>Add To Cart</button>
    </div>
  </div> 
)}
  </>
);
}
