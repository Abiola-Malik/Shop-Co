import { getProductById } from '@/actions/productActions';
import React from 'react';
import ProductImages from './ProductImages';
import StarRating from '@/components/StarRating';
import { Separator } from '@/components/ui/separator';
import SizeSelector from '@/components/SizeSelector';
import AddToCart from '@/components/AddToCart';
import { getUser } from '@/actions/user.actions';
import { toast } from 'sonner';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

const page = async ({ params }) => {
  let foundUser = null;

  try {
    const userResult = await getUser();
    foundUser = userResult?.foundUser || null;
  } catch (error) {
    console.error('⚠️ Error fetching user data:', error);
    foundUser = null; // Ensure it never crashes
  }

  const { id } = params;
  const specificProduct = await getProductById(id);

  const handleGuestClick = () => {
    toast({
      title: 'Authentication required',
      description: 'Please login to add items to your cart',
      variant: 'destructive',
    });
  };

  return (
    <div className='container mx-auto p-8 '>
      <div className='flex flex-col md:flex-row gap-8 w-full'>
        <ProductImages product={specificProduct} />
        <div className='flex flex-col gap-2 w-full md:w-1/2'>
          <h1 className='font-bold text-3xl'>{specificProduct.title}</h1>
          <div className='flex flex-row gap-2'>
            {[...Array(5)].map((_, i) => (
              <StarRating
                key={`star-${i}`}
                index={i}
                rating={specificProduct.rating}
              />
            ))}
          </div>

          <p className=' text-3xl'>${specificProduct.price}</p>
          <Separator className='space-y-2' />
          <p className='secondary-text'>{specificProduct.description}</p>
          <Separator className='space-y-2' />
          <SizeSelector />
          <Separator className='space-y-2' />

          {/* Allow adding to cart only for logged-in users */}
          {foundUser ? (
            <AddToCart
              userId={foundUser.$id}
              productId={String(specificProduct.id)}
              image={specificProduct.images[0]}
              quantity={1}
              price={specificProduct.price}
              title={specificProduct.title}
            />
          ) : (
            <button
              onClick={handleGuestClick}
              className='w-full py-3 px-4 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed'
            >
              Add to Cart (Login Required)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
