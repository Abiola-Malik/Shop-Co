import React from 'react';
import { getProducts } from '@/actions/productActions';
import Link from 'next/link';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const ProductsPage = async ({ searchParams }) => {
  const page = Number(searchParams?.page) || 1;
  const pageSize = 6;
  const products = await getProducts();

  const totalPages = Math.ceil(products.length / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedProducts = products.slice(start, start + pageSize);

  return (
    <div className='section-container'>
      <h1 className='font-bold text-3xl capitalize px-6'>products</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
        {paginatedProducts.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className='border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition'
          >
            <img
              src={product.images[0] || product.images}
              alt={product.title}
              className='w-full h-48 object-cover'
            />
            <div className='p-4 flex flex-col gap-2'>
              <h4 className='text-lg font-bold'>{product.title}</h4>
              <p className='text-gray-600'>${product.price}</p>
            </div>
          </Link>
        ))}
      </div>

      <Pagination className='mt-8'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={page > 1 ? `?page=${page - 1}` : '#'}
              className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={`pagination-${index + 1}`}>
              <PaginationLink
                href={`?page=${index + 1}`}
                isActive={page === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href={page < totalPages ? `?page=${page + 1}` : '#'}
              className={
                page >= totalPages ? 'pointer-events-none opacity-50' : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductsPage;
