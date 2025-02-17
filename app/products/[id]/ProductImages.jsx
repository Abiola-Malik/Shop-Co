'use client';
import { useState } from 'react';

const ProductImages = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className='flex md:flex-row gap-4 w-full md:w-1/2 flex-col-reverse'>
      {/* Thumbnail column */}
      <div className='flex md:flex-col gap-4 flex-row'>
        {product.images.map((image, index) => (
          <button
            key={`image-${index}`}
            onClick={() => setSelectedImage(index)}
            className={`w-[120px] h-[120px] rounded-2xl overflow-hidden ${
              index === selectedImage ? 'border border-black' : ''
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className='w-full h-full object-cover'
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className='w-full h-[400px] rounded-2xl overflow-hidden bg-[#F0EEED]'>
        <img
          src={product.images[selectedImage]}
          alt={product.title}
          className='w-full h-full object-cover'
        />
      </div>
    </div>
  );
};

export default ProductImages;
