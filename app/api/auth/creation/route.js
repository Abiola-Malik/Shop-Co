import { database } from '@/app/appwrite/appwrite';
import { appwriteConfig } from '@/app/appwrite/appwriteConfig';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { ID, Query } from 'appwrite';
import { NextResponse } from 'next/server';

export async function GET() {
  const { databaseId, usersCollectionId } = appwriteConfig;

  try {
    // 🛡️ Authenticate User
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    const { id, email, given_name, family_name, picture } = user;

    // 🔍 Check if User Exists in Database
    let foundUser;
    try {
      const result = await database.listDocuments(
        databaseId,
        usersCollectionId,
        [Query.equal('kindeId', id)]
      );

      foundUser = result.documents[0];
    } catch (error) {
      console.warn('Error while searching for user:', error.message);
    }

    // 📝 Create User if Not Found
    if (!foundUser) {
      await database.createDocument(
        databaseId,
        usersCollectionId,
        ID.unique(),
        {
          kindeId: id,
          email,
          name: `${given_name} ${family_name}`,
          picture,
        }
      );

      // console.log('New user created successfully');
    } else {
      // console.log('User already exists:', foundUser);
    }

    // ✅ Redirect after successful operation
    return NextResponse.redirect('http://localhost:3000');
  } catch (error) {
    console.error('Error in GET handler:', error.message);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
