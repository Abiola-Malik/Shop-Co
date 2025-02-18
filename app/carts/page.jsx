export const dynamic = 'force-dynamic';

import { getCartItems } from '@/actions/cart.action';
import { getUser } from '@/actions/user.actions';
import CartClient from './CartClient';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { BASE_URL } from '@/constants';

export const metadata = {
  title: 'Cart',
  description: 'Your shopping cart',
};

const CartPage = async () => {
  const { getUser: getKindeUser } = getKindeServerSession();
  const user = await getKindeUser();

  if (!user) {
    return (
      <div className='min-h-screen flex flex-col justify-center items-center'>
        <h2 className='text-2xl font-bold mb-4'>
          Please log in to view your cart
        </h2>
        <a
          href={`${BASE_URL}/api/auth/login`}
          className='px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition'
        >
          Login
        </a>
      </div>
    );
  }

  const { foundUser } = await getUser();
  if (!foundUser) throw new Error('User not found');

  const { cart, items } = await getCartItems(foundUser.$id);

  const calculateTotal = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100'>
      <div className='container mx-auto px-4 py-12'>
        <h1 className='text-4xl font-extrabold text-gray-800 mb-10 text-center'>
          Shopping Cart
        </h1>
        {!items.length ? (
          <div className='text-center py-16 bg-white rounded-2xl shadow-xl max-w-2xl mx-auto border border-gray-100'>
            <p className='text-2xl text-gray-600 font-medium mb-6'>
              Your cart is empty
            </p>
            <a
              href='/products'
              className='inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition'
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              <div className='lg:col-span-2 bg-white rounded-2xl shadow-lg p-6'>
                <CartClient items={items} cartId={cart.$id} />
              </div>
              <div className='lg:col-span-1'>
                <div className='bg-white rounded-2xl shadow-lg p-8 sticky top-4'>
                  <h2 className='text-2xl font-bold text-gray-800 mb-6 border-b pb-4'>
                    Order Summary
                  </h2>
                  <div className='space-y-4'>
                    <div className='flex justify-between items-center text-lg'>
                      <span className='text-gray-600'>Subtotal</span>
                      <span className='font-medium'>
                        ${calculateTotal().toFixed(2)}
                      </span>
                    </div>
                    <div className='flex justify-between items-center text-lg'>
                      <span className='text-gray-600'>Shipping</span>
                      <span className='text-green-600 font-medium'>Free</span>
                    </div>
                    <div className='border-t pt-4 mt-4'>
                      <div className='flex justify-between items-center text-xl font-bold'>
                        <span>Total</span>
                        <span className='text-blue-600'>
                          ${calculateTotal().toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button className='w-full py-4 bg-blue-600 text-white font-bold rounded-xl mt-6 hover:bg-blue-700 transition'>
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
