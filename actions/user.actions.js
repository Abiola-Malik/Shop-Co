import { database } from '@/app/appwrite/appwrite';
import { appwriteConfig } from '@/app/appwrite/appwriteConfig';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Query } from 'appwrite';

export const getUser = async () => {
  try {
    const session = getKindeServerSession();
    const kindeUser = await session.getUser(); // Fixed the method call.
    const { id } = kindeUser;

    const { databaseId, usersCollectionId } = appwriteConfig;

    const userResponse = await database.listDocuments(
      databaseId,
      usersCollectionId,
      [Query.equal('kindeId', id)]
    );

    const foundUser = userResponse.documents[0];
    if (!foundUser) {
      throw new Error('User not found, please login again');
    }

    return { foundUser }; // Return an object to match the destructuring used in CartPage.
  } catch (error) {
    console.error('Error fetching user:', error.message);
    throw new Error('Failed to retrieve user data');
  }
};
