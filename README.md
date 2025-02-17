# Fullstack Next.js E-commerce Application

This is a modern e-commerce application built with Next.js 15, featuring a robust shopping experience with real-time cart updates and secure payment processing.

## Features

- Product catalog with dynamic filtering and search
- Real-time shopping cart functionality
- Secure payment processing with Stripe
- User authentication and account management
- Responsive design for all devices
- Admin dashboard for product management
- Order tracking and history

## Tech Stack

- **Frontend:** Next.js 15, React, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Appwrite for database management
- **Authentication:** KindeAuth
- **Payment Processing:** Stripe
- **State Management:** React Context API
- **Styling:** Tailwind CSS with custom configurations

## Getting Started

1. Clone the repository
2. Install dependencies:

npm install

# or

yarn install

# or

pnpm install

3. Set up environment variables:
   Create a `.env.local` file with the following:

KINDE_CLIENT_ID
KINDE_CLIENT_SECRET
KINDE_ISSUER_URL
KINDE_SITE_URL=
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/api/auth/creation
NEXT_PUBLIC_APPWRITE_PROJECTID
NEXT_PUBLIC_APWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_DATABASE_ID
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID
NEXT_PUBLIC_APPWRITE_CARTS_COLLECTION_ID
NEXT_PUBLIC_APPWRITE_CARTS_ITEMS_COLLECTION_ID

4. Run the development server:

npm run dev

# or

yarn dev

# or

pnpm dev

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

├── app/
│ ├── api/ # API routes
│ ├── components/ # Reusable components
│ ├── lib/ # Utility functions
│ ├── models/ # Database models
│ └── pages/ # Application pages
├── public/ # Static assets

## Key Features Implementation

### Authentication

- Secure user authentication using KindeAuth
- Protected routes and API endpoints
- Social login options

### Shopping Cart

- Real-time cart updates
- Persistent cart data
- Dynamic price calculations

### Payment Processing

- Secure checkout with Stripe
- Order confirmation
- Payment history

### Admin Dashboard

- Product management (CRUD operations)
- Order management
- User management
- Analytics dashboard

## Deployment

The application is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
