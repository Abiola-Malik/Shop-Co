'use client';
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from '@kinde-oss/kinde-auth-nextjs';
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CgProfile } from 'react-icons/cg';
import { database } from '@/app/appwrite/appwrite';
import { Query } from 'appwrite';
import { appwriteConfig } from '@/app/appwrite/appwriteConfig';
import Image from 'next/image';

const ProfileDetails = () => {
  const { databaseId, usersCollectionId } = appwriteConfig;
  const { isAuthenticated, user } = useKindeBrowserClient();
  const [appwriteUser, setAppwriteUser] = useState(null);
  useEffect(() => {
    const dbId = databaseId;
    // console.log('dbId', dbId);
    const fetchAppwriteUser = async () => {
      if (user?.id) {
        try {
          const response = await database.listDocuments(
            databaseId,
            usersCollectionId,

            [Query.equal('kindeId', user.id)]
          );

          if (response.documents.length > 0) {
            setAppwriteUser(response.documents[0]);
          }
        } catch (error) {
          console.error('Error fetching Appwrite user:', error);
        }
      }
    };

    fetchAppwriteUser();
  }, [isAuthenticated]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {appwriteUser?.picture ? (
          <Image
            src={appwriteUser.picture}
            alt='Profile Picture'
            width={24}
            height={24}
            className='rounded-full'
          />
        ) : (
          <CgProfile className='text-[24px] outline-none' />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {isAuthenticated && appwriteUser != null
            ? appwriteUser.name
            : 'My Account'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isAuthenticated ? (
          <DropdownMenuItem>
            <LogoutLink>Log out </LogoutLink>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <LoginLink>Log in </LoginLink>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDetails;
