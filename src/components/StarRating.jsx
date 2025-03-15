import React, { useState } from 'react';


export const StarRating = ({
    totalStars = 5,
    initialRating = 0,
    onChange,
    starClassName = 'text-2xl'
}) => {
    const [rating, setRating] = useState(initialRating);
    const [hover, setHover] = useState(0);

    const handleClick = (value) => {
        setRating(value);
        onChange?.(value);
    };

    return (
        <div className="flex gap-4">
            {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <button
                        key={index}
                        className={`focus:outline-none transition-colors ${starClassName}`}
                        onClick={() => handleClick(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                    >
                        <span className={`${(hover || rating) >= starValue ? 'opacity-100' : 'opacity-20'}`}>
                            ★
                        </span>
                    </button>
                );
            })}
        </div >
    );
};
