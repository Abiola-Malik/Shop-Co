'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const SizeSelector = () => {
  return (
    <div className='flex flex-col items-start'>
      <label className='block text-sm font-medium text-gray-700 mb-2'>
        Select Size
      </label>
      <ToggleGroup
        type='single'
        className='flex flex-wrap items-start gap-2 w-full justify-start'
        defaultValue='medium'
      >
        {['small', 'medium', 'large'].map((size) => (
          <ToggleGroupItem
            key={size}
            value={size}
            className='data-[state=on]:bg-black data-[state=on]:text-white transition-all px-4 secondary-text py-1 rounded-full capitalize text-sm hover:bg-gray-100 border border-gray-200'
          >
            {size}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default SizeSelector;
