'use client';

import { useState, useEffect, useCallback } from 'react';
import { Input } from './ui/input';
import { BiSearch } from 'react-icons/bi';
import debounce from 'lodash.debounce';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from './ui/dialog';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchProducts = async (term) => {
    if (!term) {
      setProducts([]);
      return;
    }
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
      if (!response.ok) throw new Error('Search request failed');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error searching products:', error);
      setProducts([]);
    }
  };

  const debouncedSearch = useCallback(
    debounce((term) => {
      searchProducts(term);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  const renderSearchResults = () => {
    if (!searchTerm) return null;
    if (products.length === 0) {
      return <p className='text-sm text-gray-500 p-4'>No products found</p>;
    }
    return products.map((product) => (
      <Link
        href={`/products/${product.id}`}
        key={product.id}
        className='flex items-center p-4 hover:bg-gray-100 transition-colors duration-200'
        onClick={() => setIsSearchOpen(false)}
      >
        <p className='text-sm font-medium'>{product.title}</p>
      </Link>
    ));
  };

  return (
    <div className='relative w-full max-w-3xl mx-auto'>
      {/* Mobile Search */}
      <div className='block lg:hidden'>
        <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <DialogTrigger asChild>
            <BiSearch
              className='w-6 h-6 cursor-pointer text-gray-700 hover:text-gray-900 transition-colors duration-200'
              onClick={() => setIsSearchOpen(true)}
            />
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px] p-4'>
            <DialogTitle className='text-lg font-semibold mb-4'>
              Search Products
            </DialogTitle>
            <div className='relative'>
              <Input
                type='text'
                placeholder='Search products...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent'
              />
              <BiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
            </div>
            <div className='mt-4 max-h-[60vh] overflow-y-auto rounded-lg border border-gray-100'>
              {renderSearchResults()}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Desktop Search */}
      <div className='hidden lg:block relative'>
        <div className='relative'>
          <Input
            type='text'
            placeholder='Search products...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-2 bg-brand-100 text-black border-none rounded-full focus:ring-2 focus:ring-brand-500'
          />
          <BiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500' />
        </div>

        {searchTerm && (
          <div className='absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg border border-gray-100 max-h-[60vh] overflow-y-auto z-50'>
            {renderSearchResults()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
