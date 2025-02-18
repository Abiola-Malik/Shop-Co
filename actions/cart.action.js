import { database } from '@/app/appwrite/appwrite';
import { appwriteConfig } from '@/app/appwrite/appwriteConfig';
import { Query } from 'appwrite';
import { toast } from 'sonner';
import { BASE_URL } from '@/constants';
const { databaseId, cartCollectionId, cartItemsCollectionId } = appwriteConfig;

// export const AddProductToCart = async ({
//   userId,
//   productId,
//   quantity,
//   price,
//   title,
//   image,
// }) => {
//   const response = await fetch('/api/cart', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       userId,
//       productId,
//       quantity,
//       price,
//       title,
//       image,
//     }),
//   });
//   if (response.ok) {
//     const data = await response.json();
//     return {
//       status: 200,
//       message: 'Product added to cart successfully',
//       data,
//     };
//   } else {
//     throw new Error('Failed to add product to cart');
//   }
// };

export const AddProductToCart = async ({
  userId,
  productId,
  quantity,
  price,
  title,
  image,
}) => {
  try {
    const response = await fetch(`${BASE_URL}/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        productId,
        quantity,
        price,
        title,
        image,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Parse server error message
      throw new Error(errorData.message || 'Failed to add product to cart');
    }

    const data = await response.json();
    return {
      status: 200,
      message: 'Product added to cart successfully',
      data,
    };
  } catch (error) {
    console.error('AddProductToCart Error:', error.message);
    throw new Error(
      error.message || 'Something went wrong while adding to cart'
    );
  }
};

export const getCartItems = async (userId) => {
  try {
    if (!userId) {
      throw new Error('UserId is required');
    }

    // Fetch the user's cart
    const userCart = await database.listDocuments(
      databaseId,
      cartCollectionId,
      [Query.equal('users', userId)]
    );

    // Check if the user has a cart
    if (!userCart.documents.length) {
      return { cart: null, items: [] }; // Consistent structure
    }

    const cart = userCart.documents[0];

    // Fetch cart items
    const cartItems = await database.listDocuments(
      databaseId,
      cartItemsCollectionId,
      [Query.equal('cart', cart.$id)]
    );

    return {
      cart,
      items: cartItems.documents,
    };
  } catch (error) {
    console.error('Error fetching cart items:', error.message);
    throw new Error('Failed to fetch cart items. Please try again later.');
  }
};

export const removeCartItem = async (cartItemId) => {
  try {
    if (!cartItemId) {
      throw new Error('Cart item ID is required');
    }
    await database.deleteDocument(
      databaseId,
      cartItemsCollectionId,
      cartItemId
    );

    toast.success('Item removed from cart successfully!');
    return { status: 200, message: 'Item removed from cart successfully!' };
  } catch (error) {
    console.error('Error removing item from cart:', error.message);
    return {
      status: 500,
      message: `Failed to remove item from cart: ${error.message}`,
    };
  }
};

export const updateCartItem = async (cartItemId, quantity) => {
  try {
    await database.updateDocument(
      databaseId,
      cartItemsCollectionId,
      cartItemId,
      { quantity }
    );
    toast.success('Cart item updated successfully!');
    return { status: 200, message: 'Cart item updated successfully!' };
  } catch (error) {
    console.error('Error updating cart item:', error);
    return {
      status: 500,
      message: 'Failed to update cart item',
    };
  }
};

export const clearCart = async (cartId) => {
  try {
    const { databaseId, cartItemsCollectionId } = appwriteConfig;

    // Fetch all cart items for the cart
    const cartItems = await database.listDocuments(
      databaseId,
      cartItemsCollectionId,
      [Query.equal('cart', cartId)]
    );

    // Delete each cart item
    const deletePromises = cartItems.documents.map((item) =>
      database.deleteDocument(databaseId, cartItemsCollectionId, item.$id)
    );

    await Promise.all(deletePromises);

    toast.success('Cart cleared successfully!');
    return { status: 200, message: 'Cart cleared successfully!' };
  } catch (error) {
    console.error('Error clearing cart:', error.message);
    return {
      status: 500,
      message: `Failed to clear cart: ${error.message}`,
    };
  }
};
