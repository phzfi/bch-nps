import React, { useState } from 'react';
import reviews from './data';
import './Review.css';


const Review = () => {
    const [index,setIndex] = useState(0)
    const {comment,score,createdAt} = reviews[index] 

    return (
        <div className='container'>
            <div className='review-single'>
                <div className='rate-group'>
                <p className='rate'>{score}
                </p>
                <div className='star'></div>
                </div>
                <p className='comment'>{comment}</p>
                <p className='date'>{createdAt}</p>
            </div>
            <div className='review-single'>
                <p className='rate'>{score}</p>
                <p className='comment'>{comment}</p>
                <p className='date'>{createdAt}</p>
            </div>
            <div className='review-single'>
                <p className='rate'>{score}</p>
                <p className='comment'>{comment}</p>
                <p className='date'>{createdAt}</p>
            </div>
            <div className='review-single'>
                <p className='rate'>{score}</p>
                <p className='comment'>{comment}</p>
                <p className='date'>{createdAt}</p>
            </div>
            <div className='review-single'>
                <p className='rate'>{score}</p>
                <p className='comment'>{comment}</p>
                <p className='date'>{createdAt}</p>
            </div>

            <div className='review-single'>
                <p className='rate'>{score}</p>
                <p className='comment'>{comment}</p>
                <p className='date'>{createdAt}</p>
            </div>

            <div className='review-single'>
                <p className='rate'>{score}</p>
                <p className='comment'>{comment}</p>
                <p className='date'>{createdAt}</p>
            </div>

            <div className='review-single'>
                <p className='rate'>{score}</p>
                <p className='comment'>{comment}</p>
                <p className='date'>{createdAt}</p>
            </div>
        </div>
    );
};

export default Review;