import React from 'react';
import { NavLink } from 'react-router-dom';

function CategoryCard({ category }) {
  return (
    <NavLink
      to={`/collection/${category.name}`}
      className='h-65 w-70 flex flex-col bg-primaryGray rounded-4xl p-6'>

      <div className='flex justify-between'>
        <div className='flex flex-col '>
          <span className='text-gray-800  text-xl'>{category.label}</span>
        </div>

      </div>

      <div className='w-full grow flex items-end '>

        <img src={category.imageURL} className='h-40 w-auto ' />
      </div>
    </NavLink>
  );
}

export default CategoryCard;