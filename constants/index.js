export const NavLinks = [
  {
    name: 'Home',
    url: '/',
  },
  // {
  //   name: 'About Us',
  //   url: '/about',
  // },
  {
    name: 'Contact Us',
    url: '/contact',
  },
  {
    name: 'Products',
    url: '/products',
  },
];

export const reviews = [
  {
    id: 1,
    customerName: 'Alice Johnson',
    rating: 5,
    comment:
      'Fantastic shopping experience! The website is user-friendly, and delivery was super fast.',
    date: '2024-06-01',
  },
  {
    id: 2,
    customerName: 'David Smith',
    rating: 4.7,
    comment:
      'Great variety of products and reasonable prices. Checkout was smooth and easy.',
    date: '2024-06-10',
  },

  {
    id: 4,
    customerName: 'James White',
    rating: 4,
    comment:
      'Good overall experience. Packaging could be improved, but everything arrived intact.',
    date: '2024-06-20',
  },
  {
    id: 5,
    customerName: 'Emily Clark',
    rating: 5,
    comment:
      "I've been shopping here for months, and it never disappoints. Highly recommended!",
    date: '2024-06-25',
  },
];

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
