'use client';
import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { AddProductToCart } from '@/actions/cart.action';
import { toast } from 'sonner';

const AddToCart = ({ userId, productId, price, title, image }) => {
  const [count, setCount] = useState(0);

  // const handleAddToCart = async () => {
  //   if (count > 0) {
  //     await AddProductToCart({
  //       userId,
  //       productId,
  //       quantity: count,
  //       price,
  //       title,
  //       image,
  //     });
  //
  //   }
  //    else {
  //     alert('Please select a quantity before adding to the cart.');
  //   }
  //
  // };

  const handleAddToCart = async () => {
    if (count <= 0) {
      toast.error('Please select a quantity before adding to the cart.');
      return;
    }

    try {
      const result = await AddProductToCart({
        userId,
        productId,
        quantity: count,
        price: String(price),
        title,
        image,
      });

      // Show success toast
      toast.success(result.message || 'Product added to cart successfully!');
    } catch (error) {
      // Show error toast
      toast.error(
        error.message || 'Failed to add product to cart. Please try again.'
      );
    }
  };

  return (
    <div className='w-full flex flex-row gap-3 items-center'>
      <Counter count={count} setCount={setCount} />
      <button
        onClick={handleAddToCart}
        className='flex flex-row justify-center items-center w-full max-w-[400px] h-[52px] px-6 py-4 bg-black text-white rounded-[62px] gap-3'
      >
        <span className='text-base font-medium leading-[22px] font-sans'>
          Add to Cart
        </span>
      </button>
    </div>
  );
};

export default AddToCart;

const Counter = ({ count, setCount }) => {
  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCount((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className='flex flex-row items-center justify-between w-[170px] h-[52px] px-5 py-4 bg-[#F0F0F0] rounded-[62px] gap-3'>
      <button
        onClick={handleDecrement}
        className='w-6 h-6 flex items-center justify-center'
        aria-label='Decrease quantity'
      >
        <Minus size={20} />
      </button>

      <span className='text-base font-medium leading-[22px] font-sans'>
        {count}
      </span>

      <button
        onClick={handleIncrement}
        className='w-6 h-6 flex items-center justify-center'
        aria-label='Increase quantity'
      >
        <Plus size={20} />
      </button>
    </div>
  );
};
