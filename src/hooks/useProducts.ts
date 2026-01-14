// handle tanstack query logic to fetch data from the API
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import { ProductResponse } from '../Types/Product';

const fetchProducts = async (search: string, skip: number): Promise<ProductResponse> => {
  const url = search 
    ? `https://dummyjson.com/products/search?q=${search}&limit=10&skip=${skip}`
    : `https://dummyjson.com/products?limit=10&skip=${skip}`;
    
  const { data } = await axios.get(url);
  return data;
};

export const useProducts = (search: string, page: number) => {
  return useQuery({
    queryKey: ['products', search, page], 
    queryFn: () => fetchProducts(search, page * 10), 
  });
};