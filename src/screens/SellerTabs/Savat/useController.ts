import {useCallback, useState} from 'react';
import {api} from 'api';
import {navigate} from 'navigators/NavigationService.ts';
import {get} from 'lodash';
import logger from 'helpers/logger';

const useController = () => {
  const [baskets, setBaskets] = useState([]);
  const getAll = useCallback(() => {
    api
      .get('/orders?include=transaction,orderSum,orderGoodsCount&sort=-id')
      .then(({data}) => {
        setBaskets(data);
      });
  }, []);

  const createOrder = useCallback(() => {
    api
      .post('/orders', {payment_type: 1})
      .then(data => {
        navigate('CreateOrder', {id: get(data, 'id')});
        return true;
      })
      .catch(() => {
        return false;
      });
  }, []);

  return {
    getAll,
    baskets,
    createOrder,
  };
};
export default useController;
