import { NextResponse } from 'next/server';
import products from '@/data/db.json';

export async function GET(request, { params }) {
  const { id } = await params;
  const product = await products.find((product) => product.id === parseInt(id));

  if (!product) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}
