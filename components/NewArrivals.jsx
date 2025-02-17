'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { getProducts } from '@/actions/productActions';
const API_URL = `/api/products`;

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <article className='section-container'>
      <h3 className='font-bold text-4xl text-black text-center'>
        New Arrivals
      </h3>
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6'>
        {products.length > 0 ? (
          products.slice(0, 4).map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className='flex flex-col gap-2 border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition'
            >
              <img
                src={product.images}
                alt={product.title}
                className='w-full h-48 object-cover'
              />
              <div className='p-4 flex flex-col gap-2'>
                <h4 className='text-lg font-bold'>{product.title}</h4>
                <p className='text-gray-600'>${product.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className='text-gray-500 text-center col-span-full'>
            No products available.
          </p>
        )}
      </section>
      <div className='flex justify-center pb-5'>
        <Link href='/products'>
          <Button
            variant='outline'
            className='flex items-center justify-center px-6 py-2 gap-2 w-[150px] h-[44px] border border-black/10 rounded-full text-[14px] leading-[20px] font-medium'
          >
            View All
          </Button>
        </Link>
      </div>
    </article>
  );
};

export default NewArrivals;
