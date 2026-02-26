import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const StarRating = ({ rating, totalStars = 5, size = 16, interactive = false, onChange }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className={`flex items-center space-x-0.5 ${interactive ? 'cursor-pointer' : ''}`}>
            {[...Array(fullStars)].map((_, i) => (
                <Star
                    key={`full-${i}`}
                    size={size}
                    fill="#F5A623"
                    stroke="none"
                    onClick={() => interactive && onChange && onChange(i + 1)}
                />
            ))}
            {hasHalfStar && (
                <div className="relative">
                    <Star size={size} stroke="#F5A623" strokeWidth={2} />
                    <div className="absolute inset-0 overflow-hidden w-1/2">
                        <Star size={size} fill="#F5A623" stroke="none" />
                    </div>
                </div>
            )}
            {[...Array(emptyStars > 0 ? emptyStars : 0)].map((_, i) => (
                <Star
                    key={`empty-${i}`}
                    size={size}
                    stroke="#E2E8F0"
                    strokeWidth={2}
                    onClick={() => interactive && onChange && onChange(fullStars + (hasHalfStar ? 1 : 0) + i + 1)}
                />
            ))}
        </div>
    );
};

export default StarRating;
