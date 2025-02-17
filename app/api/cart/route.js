import { database } from '@/app/appwrite/appwrite';
import { ID, Query } from 'appwrite';
import { NextResponse } from 'next/server';
import { appwriteConfig } from '@/app/appwrite/appwriteConfig';

const { databaseId, cartCollectionId, cartItemsCollectionId } = appwriteConfig;

export async function POST(req) {
  try {
    const { userId, productId, quantity, price, title, image } =
      await req.json();

    if (!userId || !productId || !quantity || !price || !title || !image) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find user's active cart or create new one
    const existingCarts = await database.listDocuments(
      databaseId,
      cartCollectionId,
      [Query.equal('users', userId.trim())]
    );

    let cart =
      existingCarts.documents[0] ||
      (await database.createDocument(
        databaseId,
        cartCollectionId,
        ID.unique(),
        {
          users: userId.trim(),
          total: (price * quantity).toString(),
        }
      ));

    // Check if product already exists in cart
    const existingItems = await database.listDocuments(
      databaseId,
      cartItemsCollectionId,
      [Query.equal('cart', cart.$id), Query.equal('productId', productId)]
    );

    let cartItem;
    if (existingItems.documents.length > 0) {
      const existingItem = existingItems.documents[0];
      cartItem = await database.updateDocument(
        databaseId,
        cartItemsCollectionId,
        existingItem.$id,
        { quantity: existingItem.quantity + quantity }
      );
    } else {
      cartItem = await database.createDocument(
        databaseId,
        cartItemsCollectionId,
        ID.unique(),
        { cart: cart.$id, productId, quantity, price, title, image }
      );
    }

    // Update cart total
    const allCartItems = await database.listDocuments(
      databaseId,
      cartItemsCollectionId,
      [Query.equal('cart', cart.$id)]
    );

    const newTotal = allCartItems.documents.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );

    await database.updateDocument(databaseId, cartCollectionId, cart.$id, {
      total: newTotal.toString(),
    });

    return NextResponse.json(
      { message: 'Item added to cart successfully', cartItem },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return NextResponse.json(
      { message: 'Failed to add item to cart', error: error.message },
      { status: 500 }
    );
  }
}
