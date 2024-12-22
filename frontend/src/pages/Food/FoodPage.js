import React, { useEffect, useState } from 'react'
import classess from './foodPage.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { getById } from '../../services/foodService';
import StarRating from '../../components/StarRating/StarRating';
import Tags from '../../components/Tags/Tags';
import Price from '../../components/Price/Price';
import { useCart } from '../../hooks/useCart';
import NotFound from '../../components/NotFound/NotFound';
export default function FoodPage() {
    const [food, setFood] = useState({});
    const {id} = useParams();
    const {addToCart} = useCart();
    const navigate = useNavigate();

    const handleAddToCart = () => {
      addToCart(food);
      navigate('/cart');
    };

    useEffect(() => {
        getById(id).then(setFood);
    }, [id]);
  return (
  <>
  { !food ? (
    <NotFound message="Food Not Found!" linkText="Back To Homepage" />
  ) : (
     <div className={classess.container}>
    <img
    className={classess.image}
    src={`${food.imageUrl}`}
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
          <button onClick={handleAddToCart}>Add To Cart</button>
    </div>
  </div> 
)}
  </>
);
}
