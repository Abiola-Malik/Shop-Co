import React from 'react';
import { IoStar } from 'react-icons/io5';
const StarRating = ({ index, rating }) => {
  return (
    <IoStar
      className={`w-[22.58px] h-[22.58px] ${
        index + 1 <= rating
          ? 'text-[#FFC633]'
          : index < Math.ceil(rating)
          ? 'text-[#FFC633] opacity-50'
          : 'text-gray-300'
      }`}
    />
  );
};

export default StarRating;
