export const appwriteConfig = {
  endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
  usersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
  cartCollectionId: process.env.NEXT_PUBLIC_APPWRITE_CARTS_COLLECTION_ID,
  cartItemsCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_CARTS_ITEMS_COLLECTION_ID,
};
