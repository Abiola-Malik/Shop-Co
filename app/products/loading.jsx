export default function Loading() {
  return (
    <div className='flex-1 p-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {[...Array(10)].map((item) => (
          <div
            key={item}
            className='bg-white p-4 rounded-lg shadow animate-pulse'
          >
            <div className='h-48 bg-gray-200 rounded-md mb-4'></div>
            <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
            <div className='h-4 bg-gray-200 rounded w-1/2 mb-4'></div>
            <div className='flex justify-between items-center'>
              <div className='h-6 bg-gray-200 rounded w-1/4'></div>
              <div className='h-8 bg-gray-200 rounded w-24'></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
