import React from 'react';
import { useGetProductCategoriesQuery } from '../../features/product/apiProducts'
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const { data, error, isLoading } = useGetProductCategoriesQuery();

  if (isLoading) {
    // Tampilkan pesan atau indikator ketika sedang memuat
    return <div>Loading...</div>;
  }

  if (error) {
    // Tampilkan pesan atau komponen yang sesuai ketika terjadi error
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Kategori Produk</h2>
      <ul>
        {data?.map((category, index) => (
          <li key={index}>
            <Link to={`/category-list/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
