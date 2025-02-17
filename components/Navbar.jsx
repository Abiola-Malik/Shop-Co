import { NavLinks } from '@/constants';
import React from 'react';
import Search from './Search';
import { IoCartOutline } from 'react-icons/io5';
import ProfileDetails from './ProfileDetails';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { RxHamburgerMenu } from 'react-icons/rx';

const Navbar = () => {
  return (
    <nav className=' flex flex-row gap-8 h-full items-center justify-between px-8 py-4'>
      <div className='flex items-center gap-4'>
        <Sheet>
          <SheetTrigger className='md:hidden'>
            <RxHamburgerMenu className='h-6 w-6' />
          </SheetTrigger>
          <SheetContent side='left' className='w-[300px]'>
            <div className='flex flex-col gap-4 mt-8'>
              {NavLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className='text-[14px] hover:opacity-80'
                >
                  {link.name}
                </a>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <h2 className='text-[22px] font-bold '>SHOP.CO</h2>
      </div>

      <ul className='md:flex flex-row gap-4 w-fit h-full items-center justify-center hidden'>
        {NavLinks.map((link, index) => (
          <li key={index} className=''>
            <a href={link.url} className='text-[14px] hover:opacity-80'>
              {link.name}
            </a>
          </li>
        ))}
      </ul>

      <div className='flex flex-row gap-2 items-center'>
        <Search />
        <Link href='/carts' aria-label='Cart'>
          <IoCartOutline className='text-[24px] outline-none hover:text-gray-600 transition-colors duration-200' />
        </Link>

        <ProfileDetails />
      </div>
    </nav>
  );
};

export default Navbar;
