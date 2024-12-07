import {useCallback, useState} from 'react';
import {api} from 'api';
import logger from 'helpers/logger';
import Toast from 'react-native-toast-message';

const useController = () => {
  const [products, setProducts] = useState([]);

  const addProduct = useCallback(
    (product_id: number, order_id: number, amount: number, price: number) => {
      api
        .post('/order-goods', {
          order_id,
          product_id,
          amount,
          price,
        })
        .then(({data}) => {
          console.log(data);
          Toast.show({
            type: 'success',
            text1: 'Товар добавлен',
            text2: 'Товар успешно добавлен в заказ',
          });
        })
        .finally(() => {
          getAllProducts(order_id);
        });
    },
    [],
  );
  const getAllProducts = useCallback((order_id: number) => {
    api
      .get(`/order-goods?include=product&filter[order_id]=${order_id}`)
      .then(({data}) => {
        setProducts(data);
      });
  }, []);
  return {
    products,
    addProduct,
    getAllProducts,
  };
};
export default useController;
