# Project Documentation

This document provides a comprehensive overview of the Fullstack Next.js E-commerce Application, including its architecture, features, and implementation details.

## Stack & Architecture

The application is built using the following technologies:

-   **Next.js 15**: React framework for building server-rendered and statically generated web applications.
-   **React**: JavaScript library for building user interfaces.
-   **Radix UI**: Set of unstyled, accessible UI primitives.
-   **KindeAuth**: Authentication service for secure user management.
-   **Appwrite**: Open-source backend-as-a-service platform.
-   **Stripe**: Payment processing platform.

The architecture follows a typical Next.js structure with API routes, reusable components, and utility functions.

## Project Structure

```
├── app/
│   ├── api/             # API routes
│   ├── components/      # Reusable components
│   ├── lib/             # Utility functions
│   ├── models/          # Database models
│   └── pages/           # Application pages (Note: Using 'app' directory instead for Next.js 13+)
├── public/            # Static assets
├── README.md          # Project documentation
├── package.json       # Project dependencies and scripts
└── ...
```

## Core Technologies

| Technology              | Version   | Description                                                              |
| ----------------------- | --------- | ------------------------------------------------------------------------ |
| Next.js                 |           | React framework for building web applications                           |
| React                   |           | JavaScript library for building user interfaces                         |
| @radix-ui/react-accordion | ^1.2.2  | Accessible accordion component                                         |
| @radix-ui/react-dialog   | ^1.1.4  | Accessible dialog (modal) component                                     |
| @radix-ui/react-dropdown-menu | ^2.1.4 | Accessible dropdown menu component                                     |
| @kinde-oss/kinde-auth-nextjs | ^2.4.6 | Authentication library for Next.js                                    |
| appwrite                |           | Open-source backend-as-a-service                                        |
| stripe                  |           | Payment processing platform                                              |

## Key Features

-   **Product Catalog**: Browse and search for products with dynamic filtering.
-   **Real-time Shopping Cart**: Update the cart in real-time as items are added or removed.
-   **Secure Payment Processing**: Process payments securely using Stripe.
-   **User Authentication**: Secure user authentication and account management with KindeAuth.
-   **Responsive Design**: Application is designed to be responsive on all devices.
-   **Admin Dashboard**: Manage products and orders via an admin dashboard.
-   **Order Tracking**: Track order history and status.

## File-by-File Documentation

### `components/Accordion.jsx` (lines 1-44)

```typescript
"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
  </AccordionPrimitive.Trigger>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="py-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

```

This is a client component that uses Radix UI's accordion primitives to create an accessible accordion component.

-   `Accordion`: The root component.
-   `AccordionItem`:  Wraps each accordion item, adding a border.
-   `AccordionTrigger`: The button that toggles the accordion item's content.
-   `AccordionContent`: The content that is displayed when the accordion item is open.

### `components/Card.jsx` (lines 1-51)

```typescript
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
    {...props} />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props} />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-0", className)}
    {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props} />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

Defines `Card` and related sub-components (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`) for structuring content in a card-like layout.  It leverages `React.forwardRef` to allow passing refs to the underlying `div` elements and `cn` from ` "@/lib/utils"` for conditional class names.

### `components/Dialog.jsx` (lines 1-49)

```typescript
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-100",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = "DialogOverlay"

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Content
    ref={ref}
    className={cn(
      "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-100 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
      className
    )}
    {...props}
  >
    {children}
    <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary data-[state=open]:text-muted-foreground">
      <X className="h-4 w-4" />
      <span className="sr-only">Close</span>
    </DialogPrimitive.Close>
  </DialogPrimitive.Content>
))
DialogContent.displayName = "DialogContent"

const DialogHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({ className, ...props }) => (
  <div className={cn("sm:flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
DialogDescription.displayName = "DialogDescription"

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose, DialogOverlay, DialogPortal }
```

Client component that utilizes Radix UI's dialog primitives to create accessible dialogs (modals).

-   `Dialog`: Root component.
-   `DialogTrigger`: Component that opens the dialog.
-   `DialogPortal`:  Renders the dialog content in a portal.
-   `DialogClose`:  Button to close the dialog.
-   `DialogOverlay`:  Overlay behind the dialog.
-   `DialogContent`:  Content of the dialog.
-   `DialogHeader`: Header section.
-   `DialogFooter`: Footer section.
-   `DialogTitle`: Title of the dialog.
-   `DialogDescription`: Description within the dialog.

### `components/DropdownMenu.jsx` (lines 1-68)

```typescript
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = DropdownMenuPrimitive.SubTrigger

const DropdownMenuSubContent = DropdownMenuPrimitive.SubContent

const DropdownMenuContent = React.forwardRef(
  ({ className, children, sideOffset = 4, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        className={cn(
          "z-50 min-w-[220px] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        sideOffset={sideOffset}
        {...props}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  )
)
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef(
  ({ className, children, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <DropdownMenuPrimitive.ItemIndicator className="absolute left-2 top-1/2 inline-flex h-4 w-4 -translate-y-1/2">
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </DropdownMenuPrimitive.Item>
  )
)
DropdownMenuItem.displayName = "DropdownMenuItem"

const DropdownMenuCheckboxItem = React.forwardRef(
  ({ className, children, checked, ...props }, ref) => (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 top-1/2 inline-flex h-4 w-4 -translate-y-1/2">
        <Check className="h-4 w-4" />
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
)
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem"

const DropdownMenuRadioItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 top-1/2 inline-flex h-4 w-4 -translate-y-1/2">
        <Circle className="h-2 w-2 fill-current" />
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
)
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem"

const DropdownMenuLabel = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-sm font-semibold",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {...props.children}
    </DropdownMenuPrimitive.Label>
  )
)
DropdownMenuLabel.displayName = "DropdownMenuLabel"

const DropdownMenuSeparator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
  )
)
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

const DropdownMenuShortcut = ({ className, ...props }) => {
  return <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

const DropdownMenuArrow = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Arrow
    ref={ref}
    className={cn("fill-popover", className)}
    {...props}
  />
))
DropdownMenuArrow.displayName = "DropdownMenuArrow"

const DropdownMenuSubTrigger = React.forwardRef(
  ({ className, inset, children, ...props }, ref) => (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
)
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger"

const DropdownMenuSubContent = React.forwardRef(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        ref={ref}
        className={cn(
          "z-50 min-w-[220px] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        sideOffset={sideOffset}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
)
DropdownMenuSubContent.displayName = "DropdownMenuSubContent"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuArrow,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuGroup,
  DropdownMenuPortal,
}
```

Client component to build accessible dropdown menus using Radix UI primitives. Includes:

-   `DropdownMenu`: Root component.
-   `DropdownMenuTrigger`: Component that toggles the menu.
-   `DropdownMenuContent`:  The dropdown content.
-   `DropdownMenuItem`:  A regular menu item.
-   `DropdownMenuCheckboxItem`: A checkbox menu item.
-   `DropdownMenuRadioItem`: A radio button menu item.
-   `DropdownMenuLabel`:  A label for a section of the menu.
-   `DropdownMenuSeparator`:  A visual separator.
-   `DropdownMenuShortcut`:  Displays a keyboard shortcut.
-   `DropdownMenuArrow`: Arrow indicator for the menu.
-   `DropdownMenuSub`:  Submenu container.
-   `DropdownMenuSubTrigger`:  Toggles the submenu.
-   `DropdownMenuSubContent`:  The submenu content.
- `DropdownMenuGroup`: Groups menu items.
- `DropdownMenuPortal`: Portal for the dropdown menu.

### `components/Footer.jsx` (lines 1-48)

```typescript
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-gradient-to-r from-brand-100 to-brand-200 py-20'>
      <div className='section-container px-4 md:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16'>
          <div className='flex flex-col gap-8 transform hover:scale-105 transition-all duration-300'>
            <h2 className='text-4xl font-extrabold text-gray-900'>E-Shop</h2>
            <p className='text-gray-700'>Your one-stop destination for quality products and exceptional shopping experience.</p>
            <div className='flex gap-4 text-gray-500'>
              <a href='#' className='hover:text-gray-700 transition-colors duration-200'><FaFacebook size={24} /></a>
              <a href='#' className='hover:text-gray-700 transition-colors duration-200'><FaTwitter size={24} /></a>
              <a href='#' className='hover:text-gray-700 transition-colors duration-200'><FaInstagram size={24} /></a>
              <a href='#' className='hover:text-gray-700 transition-colors duration-200'><FaLinkedin size={24} /></a>
            </div>
          </div>

          <div>
            <h3 className='text-2xl font-semibold text-gray-900 mb-4'>Explore</h3>
            <ul className='flex flex-col gap-3 text-gray-700'>
              <li><a href='#' className='hover:text-gray-900 transition-colors duration-200'>New Arrivals</a></li>
              <li><a href='#' className='hover:text-gray-900 transition-colors duration-200'>Best Sellers</a></li>
              <li><a href='#' className='hover:text-gray-900 transition-colors duration-200'>Categories</a></li>
              <li><a href='#' className='hover:text-gray-900 transition-colors duration-200'>Our Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className='text-2xl font-semibold text-gray-900 mb-4'>Customer Service</h3>
            <ul className='flex flex-col gap-3 text-gray-700'>
              <li><a href='#' className='hover:text-gray-900 transition-colors duration-200'>Contact Us</a></li>
              <li><a href='#' className='hover:text-gray-900 transition-colors duration-200'>Shipping & Returns</a></li>
              <li><a href='#' className='hover:text-gray-900 transition-colors duration-200'>FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className='text-2xl font-semibold text-gray-900 mb-4'>Subscribe</h3>
            <p className='text-gray-700 mb-4'>Stay up to date with our latest offers and new products!</p>
            <div className='flex'>
              <input type='email' placeholder='Your email address' className='px-4 py-2 rounded-l-md focus:outline-none text-gray-700' />
              <button className='bg-brand-500 text-white px-6 py-2 rounded-r-md hover:bg-brand-700 transition-colors duration-200'>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

A functional component defining the footer section of the website. It includes sections for company info, exploration links, customer service, and a subscription form.  Social media links are included using `react-icons`.

### `components/Pagination.jsx` (lines 46-100)

```typescript
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}>
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1", className)}
    {...props}>
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

export { PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious }
```

This code defines pagination components: `PaginationLink`, `PaginationPrevious`, and `PaginationNext`.  They are designed to be used together to create a pagination UI. `cn` is used to apply conditional styling.

### `components/ProfileDetails.jsx` (lines 1-41)

```typescript
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
import { appwriteConfig } from '@/config/appwrite';

const ProfileDetails = () => {
  const { isAuthenticated, user } = useKindeBrowserClient();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      if (user && user.id) {
        try {
          const response = await database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('userId', user.id)]
          );
          if (response.documents.length > 0) {
            setUsername(response.documents[0].username);
          }
        } catch (error) {
          console.error('Failed to fetch username:', error);
        }
      }
    };

    fetchUsername();
  }, [user]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <CgProfile size={30} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{username || 'Profile'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isAuthenticated ? (
          <DropdownMenuItem>
            <LogoutLink>Logout</LogoutLink>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <LoginLink>Login</LoginLink>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDetails;
```

Client component displaying user profile details and authentication options.  It utilizes KindeAuth for authentication and Appwrite to fetch the username.

-   Uses `useKindeBrowserClient` hook to check for authentication status and user information.
-   Fetches username from Appwrite database based on the user ID.
-   Renders a dropdown menu with login/logout options based on authentication status.
-   Uses components from "@/components/ui/dropdown-menu" for the dropdown UI.

### `package.json` (lines 1-41)

```json
{
  "name": "shop",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@kinde-oss/kinde-auth-nextjs": "^2.4.6",
    "@radix-ui/react-accordion": "^1.2.2",
    "@radix-ui/react-aspect-ratio": "^1.1.1",
    "@radix-ui/react-dialog": "^1.1.4",
    "@radix-ui/react-dropdown-menu": "^2.1.4",
    "@radix-ui/react-separator": "^1.1.1",
    "@radix-ui/react-slot": "^1.0.2",
    "appwrite": "^13.0.1",
    "lucide-react": "^0.303.0",
    "next": "14.0.4",
    "react": "^18",
    "react-dom": "^18",
    "react-icons": "^4.12.0",
    "tailwind-merge": "^2.2.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.0.4",
    "postcss": "^8",
    "tailwindcss": "^3.0.0",
    "typescript": "^5"
  }
}
```

This `package.json` file outlines the dependencies and scripts for the Next.js project. It specifies the versions of React, Next.js, Radix UI components, KindeAuth, Appwrite, and other libraries used in the project. The `scripts` section defines commands for development, building, starting, and linting the application.

## Getting Started

1.  **Install Dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

2.  **Run the Development Server:**

    ```bash
    npm run dev
    ```

    ```bash
    yarn dev
    ```

    ```bash
    pnpm dev
    ```

3.  **Access the Application:**

    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Authentication

-   Secure user authentication using KindeAuth.
-   Protected routes and API endpoints.
-   Social login options.