'use client'; // Declare as a Client Component

import {
  removeCartItem,
  updateCartItem,
  clearCart,
} from '@/actions/cart.action';
import { FaTrash } from 'react-icons/fa';

const CartClient = ({ items, cartId }) => {
  if (!items || items.length === 0) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <p className='text-xl text-gray-600 font-medium'>Your cart is empty</p>
      </div>
    );
  }

  const handleRemoveItem = async (itemId) => {
    try {
      await removeCartItem(itemId);
      window.location.reload(); // Refresh to update the cart view
    } catch (error) {
      console.error(error.message);
      alert('Failed to remove item. Please try again.');
    }
  };

  const handleUpdateItem = async (itemId, quantity) => {
    if (quantity < 1) return;
    try {
      await updateCartItem(itemId, quantity);
      window.location.reload(); // Refresh to update the cart view
    } catch (error) {
      console.error(error.message);
      alert('Failed to update item quantity. Please try again.');
    }
  };

  const handleClearCart = async () => {
    if (!cartId) return;
    try {
      await clearCart(cartId);
      window.location.reload(); // Refresh to update the cart view
    } catch (error) {
      console.error(error.message);
      alert('Failed to clear the cart. Please try again.');
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // return (
  //   <div className='space-y-6 p-4'>
  //     <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
  //       {items.map((item) => (
  //         <div
  //           key={item.$id}
  //           className='bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-gray-100'
  //         >
  //           <div className='relative aspect-video mb-4'>
  //             <img
  //               src={item.image}
  //               alt={item.title}
  //               className='w-full h-full object-cover rounded-lg'
  //             />
  //           </div>
  //           <h2 className='text-xl font-semibold mb-3 line-clamp-2'>
  //             {item.title}
  //           </h2>
  //           <div className='flex justify-between items-center mb-4'>
  //             <p className='text-gray-700 font-medium'>
  //               Quantity: {item.quantity}
  //             </p>
  //             <p className='text-lg font-bold text-blue-600'>
  //               ${(item.price * item.quantity).toFixed(2)}
  //             </p>
  //           </div>
  //           <div className='flex justify-between items-center gap-4'>
  //             <button
  //               className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 flex-1'
  //               onClick={() => handleRemoveItem(item.$id)}
  //             >
  //               Remove
  //             </button>
  //             <div className='flex items-center gap-2'>
  //               <button
  //                 className='p-2 w-10 h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center'
  //                 onClick={() => handleUpdateItem(item.$id, item.quantity - 1)}
  //                 disabled={item.quantity <= 1}
  //               >
  //                 -
  //               </button>
  //               <span className='font-semibold w-8 text-center'>
  //                 {item.quantity}
  //               </span>
  //               <button
  //                 className='p-2 w-10 h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center'
  //                 onClick={() => handleUpdateItem(item.$id, item.quantity + 1)}
  //               >
  //                 +
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //     <div className='mt-8 max-w-md mx-auto'>
  //       <div className='bg-white rounded-xl shadow-md p-6 mb-6'>
  //         <div className='flex justify-between items-center mb-4'>
  //           <span className='text-xl font-semibold text-gray-800'>Total:</span>
  //           <span className='text-2xl font-bold text-blue-600'>
  //             ${calculateTotal().toFixed(2)}
  //           </span>
  //         </div>
  //         <button
  //           onClick={handleClearCart}
  //           className='w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 font-medium'
  //         >
  //           Clear Cart
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className='space-y-8 px-6 py-4 max-w-7xl mx-auto'>
      {/* Cart Items */}
      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {items.map((item) => (
          <div
            key={item.$id}
            className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-200'
          >
            <div className='relative aspect-video mb-4'>
              <img
                src={item.image}
                alt={item.title}
                className='w-full h-full object-cover rounded-lg'
              />
            </div>
            <h2 className='text-lg font-semibold mb-3 line-clamp-2 text-gray-800'>
              {item.title}
            </h2>
            <div className='flex justify-between items-center mb-4'>
              <p className='text-gray-700 font-medium'>
                Quantity: {item.quantity}
              </p>
              <p className='text-lg font-bold text-blue-600'>
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <div className='flex justify-between items-center gap-4'>
              {/* Delete Icon */}
              <button
                className='p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center'
                onClick={() => handleRemoveItem(item.$id)}
                aria-label='Delete item'
              >
                <FaTrash size={18} />
              </button>
              {/* Quantity Controls */}
              <div className='flex items-center gap-2'>
                <button
                  className='p-2 w-10 h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center'
                  onClick={() => handleUpdateItem(item.$id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className='font-semibold w-8 text-center'>
                  {item.quantity}
                </span>
                <button
                  className='p-2 w-10 h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center'
                  onClick={() => handleUpdateItem(item.$id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className='mt-8 max-w-md mx-auto'>
        <div className='bg-white rounded-xl shadow-lg p-6'>
          <div className='flex justify-between items-center mb-4'>
            <span className='text-xl font-semibold text-gray-800'>Total:</span>
            <span className='text-2xl font-bold text-blue-600'>
              ${calculateTotal().toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleClearCart}
            className='w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 font-medium'
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
