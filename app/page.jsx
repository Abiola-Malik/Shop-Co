import ReviewsList from '@/components/HappyCustomers';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import NewArrivals from '@/components/NewArrivals';
import { NavLinks } from '@/constants';

const page = () => {
  return (
    <>
      <Hero />
      <NewArrivals />
      <ReviewsList />
    </>
  );
};

export default page;
