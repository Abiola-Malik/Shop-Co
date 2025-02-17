import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-gradient-to-r from-brand-100 to-brand-200 py-20'>
      <div className='section-container px-4 md:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16'>
          <div className='flex flex-col gap-8 transform hover:scale-105 transition-all duration-300'>
            <h2 className='text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text'>
              Shop.co
            </h2>
            <p className='text-gray-600 leading-relaxed text-lg'>
              We have clothes that suits your style and which you're proud to
              wear. From women to men.
            </p>
            <div className='flex gap-8'>
              <FaFacebook className='text-3xl text-gray-600 hover:text-blue-600 hover:-translate-y-2 cursor-pointer transition-all duration-300' />
              <FaTwitter className='text-3xl text-gray-600 hover:text-blue-400 hover:-translate-y-2 cursor-pointer transition-all duration-300' />
              <FaInstagram className='text-3xl text-gray-600 hover:text-pink-600 hover:-translate-y-2 cursor-pointer transition-all duration-300' />
              <FaLinkedin className='text-3xl text-gray-600 hover:text-blue-700 hover:-translate-y-2 cursor-pointer transition-all duration-300' />
            </div>
          </div>
          <div className='flex flex-col gap-8 backdrop-blur-sm bg-white/30 p-8 rounded-xl shadow-lg'>
            <h4 className='text-2xl font-bold text-gray-800'>Company</h4>
            <ul className='flex flex-col gap-6'>
              <li className='text-gray-600 hover:text-gray-900 hover:translate-x-2 cursor-pointer transition-all duration-300'>
                About Us
              </li>
              <li className='text-gray-600 hover:text-gray-900 hover:translate-x-2 cursor-pointer transition-all duration-300'>
                Contact Us
              </li>
              <li className='text-gray-600 hover:text-gray-900 hover:translate-x-2 cursor-pointer transition-all duration-300'>
                Careers
              </li>
              <li className='text-gray-600 hover:text-gray-900 hover:translate-x-2 cursor-pointer transition-all duration-300'>
                Blog
              </li>
            </ul>
          </div>
          <div className='flex flex-col gap-8 backdrop-blur-sm bg-white/30 p-8 rounded-xl shadow-lg'>
            <h4 className='text-2xl font-bold text-gray-800'>Support</h4>
            <ul className='flex flex-col gap-6'>
              <li className='text-gray-600 hover:text-gray-900 hover:translate-x-2 cursor-pointer transition-all duration-300'>
                Help Center
              </li>
              <li className='text-gray-600 hover:text-gray-900 hover:translate-x-2 cursor-pointer transition-all duration-300'>
                Terms of Service
              </li>
              <li className='text-gray-600 hover:text-gray-900 hover:translate-x-2 cursor-pointer transition-all duration-300'>
                Privacy Policy
              </li>
              <li className='text-gray-600 hover:text-gray-900 hover:translate-x-2 cursor-pointer transition-all duration-300'>
                Refund Policy
              </li>
              <li className='text-gray-600 hover:text-gray-900 hover:translate-x-2 cursor-pointer transition-all duration-300'>
                Payment Options
              </li>
            </ul>
          </div>
        </div>
        <div className='border-t border-gray-200/50 mt-20 pt-10'>
          <p className='text-center text-gray-600 text-lg font-medium'>
            © {new Date().getFullYear()}{' '}
            <span className='text-blue-600'>Shop.co</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
