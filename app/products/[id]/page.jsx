import { getProductById } from '@/actions/productActions';
import React from 'react';
import ProductImages from './ProductImages';
import StarRating from '@/components/StarRating';
import { Separator } from '@/components/ui/separator';
import SizeSelector from '@/components/SizeSelector';
import AddToCart from '@/components/AddToCart';
import { getUser } from '@/actions/user.actions';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

const page = async ({ params }) => {
  const { foundUser } = await getUser();
  // console.log(foundUser);
  const { id } = await params;
  const specificProduct = await getProductById(id);

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
          {/* Select Size */}
          <SizeSelector />
          <Separator className='space-y-2' />
          <AddToCart
            userId={foundUser.$id}
            productId={String(specificProduct.id)}
            image={specificProduct.images[0]}
            quantity={1}
            price={specificProduct.price}
            title={specificProduct.title}
          />
        </div>
      </div>
      <section className='py-16 container mx-auto'>
        {specificProduct.reviews.length > 0 && (
          <div className='mb-20'>
            <h2 className='text-3xl font-bold mb-8'>Customer Reviews</h2>
            <div className='grid gap-6'>
              {specificProduct.reviews.map((review) => (
                <div
                  key={review.id}
                  className='bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300'
                >
                  <div className='flex items-center gap-4 mb-4'>
                    <div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium'>
                      {review.comment[0]}
                    </div>
                    <div className='flex flex-row gap-1'>
                      {[...Array(5)].map((_, i) => (
                        <StarRating
                          key={`star-${i}`}
                          index={i}
                          rating={review.rating}
                        />
                      ))}
                    </div>
                  </div>
                  <p className='text-gray-700'>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className='max-w-3xl mx-auto'>
          <h2 className='text-3xl font-bold mb-8 text-center'>
            Frequently Asked Questions
          </h2>
          <Accordion type='single' collapsible className='space-y-6'>
            <AccordionItem
              value='size-guide'
              className='border-2 rounded-xl shadow-sm'
            >
              <AccordionTrigger className='px-8 py-5 hover:bg-gray-50 transition-colors duration-200'>
                <span className='font-semibold text-lg'>
                  What size should I order?
                </span>
              </AccordionTrigger>
              <AccordionContent className='px-8 py-5 text-gray-700 bg-gray-50'>
                We recommend checking our size chart for accurate measurements.
                If you're between sizes, consider sizing up for a relaxed fit.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value='shipping-info'
              className='border-2 rounded-xl shadow-sm'
            >
              <AccordionTrigger className='px-8 py-5 hover:bg-gray-50 transition-colors duration-200'>
                <span className='font-semibold text-lg'>
                  How long does shipping take?
                </span>
              </AccordionTrigger>
              <AccordionContent className='px-8 py-5 text-gray-700 bg-gray-50'>
                Shipping typically takes 5-7 business days, depending on your
                location. Express shipping options are also available at
                checkout.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value='return-policy'
              className='border-2 rounded-xl shadow-sm'
            >
              <AccordionTrigger className='px-8 py-5 hover:bg-gray-50 transition-colors duration-200'>
                <span className='font-semibold text-lg'>
                  What is your return policy?
                </span>
              </AccordionTrigger>
              <AccordionContent className='px-8 py-5 text-gray-700 bg-gray-50'>
                We accept returns within 30 days of purchase. Items must be
                unworn, unwashed, and in their original packaging. Contact our
                support for a return label.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value='materials'
              className='border-2 rounded-xl shadow-sm'
            >
              <AccordionTrigger className='px-8 py-5 hover:bg-gray-50 transition-colors duration-200'>
                <span className='font-semibold text-lg'>
                  What materials are used?
                </span>
              </AccordionTrigger>
              <AccordionContent className='px-8 py-5 text-gray-700 bg-gray-50'>
                Our clothing is made from high-quality, sustainable materials,
                including organic cotton and recycled polyester.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default page;
