import { Card, CardContent } from '@/components/ui/card';
import { IoStar } from 'react-icons/io5';
import { reviews } from '@/constants';
import { Star } from 'lucide-react';
import StarRating from './StarRating';

function ReviewCard({ customerName, rating, comment, date }) {
  return (
    <Card className='w-[400px] h-[240px] p-[28px_32px] border border-black/10 rounded-[20px] flex flex-wrap gap-[24px_342px]'>
      <CardContent className='w-[336px] h-[161.58px] flex flex-col gap-[15px] mx-auto'>
        {/* Star Ratings */}
        <div className='flex gap-[6.49px]'>
          {[...Array(5)].map((_, index) => (
            <StarRating key={index} index={index} rating={rating} />
          ))}
        </div>

        {/* Review Text */}
        <div className='flex flex-col gap-[12px] w-full'>
          <p className='text-[16px] leading-[22px] text-black/60 font-normal'>
            "{comment}"
          </p>
        </div>

        {/* Reviewer Info */}
        <div className='flex items-center gap-[4px] w-[110px] h-[24px] mt-2'>
          <span className='text-[16px] font-bold leading-[22px] text-black'>
            {customerName}
          </span>
          <div className='w-[24px] h-[24px] bg-[#01AB31] rounded-full'></div>
        </div>
      </CardContent>
    </Card>
  );
}

// Mapping over reviews array
export default function ReviewsList() {
  return (
    <div className='section-container'>
      <h3 className='font-bold text-4xl text-black text-center'>
        Happy Customers
      </h3>
      <div className='flex flex-wrap gap-6 justify-center'>
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            customerName={review.customerName}
            rating={review.rating}
            comment={review.comment}
            date={review.date}
          />
        ))}
      </div>
    </div>
  );
}
