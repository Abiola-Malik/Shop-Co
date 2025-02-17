import products from '@/data/db.json';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return Response.json([]);
    }

    const filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );

    return Response.json(filteredProducts);
  } catch (error) {
    return Response.json(
      { error: 'Failed to search products' },
      { status: 500 }
    );
  }
}
