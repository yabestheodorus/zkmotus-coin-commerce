import { useQuery } from '@tanstack/react-query';
import { get } from '../../../lib/api';
import { useParams } from 'react-router-dom';

function useGetProductCollection(props) {
  const { category } = useParams(); // /collection/:category

  const { data, isLoading } = useQuery({
    queryKey: ["products", category],
    queryFn: () => get(`/products?category=${category}`),
    staleTime: 60 * 60_000
  })

  const { data: categoriesData, isLoading: categoryLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => get("/products/categories"),
    staleTime: 60 * 60_000
  })
  const categories = categoriesData ? categoriesData.data ? categoriesData.data : [] : [];
  const products = data ? data.data ? data.data : [] : [];
  return { products, isLoading, category, categories, categoryLoading }
}

export default useGetProductCollection;