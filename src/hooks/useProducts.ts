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

export const useProducts = (search: string, page: number, category:string) => {
  return useQuery<ProductResponse>({
   queryKey: ['products', search, page, category], 
    queryFn: async () => {
      let url = `https://dummyjson.com/products`;
      
      if (category && !search) {
        url = `https://dummyjson.com/products/category/${category}`;
      } else if (search) {
        url = `https://dummyjson.com/products/search?q=${search}`;
      }

      const { data } = await axios.get(url, {
        params: {
          limit: 10,
          skip: page * 10,
        },
      });
      return data;
    },
  });
};