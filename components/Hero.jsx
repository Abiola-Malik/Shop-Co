import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

const Hero = () => {
  return (
    <div className='relative bg-brand-100 min-h-[80vh] flex items-center'>
      <div className='hero-container'>
        <div className='space-y-6'>
          <h2 className='text-4xl w-2/3 md:text-5xl font-bold leading-tight pt-8 md:pt-0'>
            Discover your own style
          </h2>
          <p className='secondary-text'>
            Explore a curated collection of outfits designed to match your
            personality and elevate your confidence with every wear.
          </p>
          <Button>
            <Link href='/carts'>Shop Now</Link>
          </Button>

          <section className='mt-8 flex flex-row gap-6 justify-start'>
            <div className='flex flex-col'>
              <h3 className='text-lg font-bold'>200+</h3>
              <small className='secondary-text '>International Brands</small>
            </div>
            <div className='flex flex-col'>
              <h3 className='text-lg font-bold'>2000+</h3>
              <p className='secondary-text'>High Quality Products</p>
            </div>
            <div className='flex flex-col'>
              <h3 className='text-lg font-bold'>30000+</h3>
              <p className='secondary-text'>Happy Customers</p>
            </div>
          </section>
        </div>
        <div className='relative h-[400px] md:h-[500px] p-6 md:p-8'>
          <div className='relative w-full h-full'>
            <Image
              src='/hero.png'
              alt='Fashion Hero'
              fill
              priority
              className='object-cover'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
