import ResourceAPI from '../api/ResourceAPI';

export default (state = [], action) => {
    switch (action.type) {
      case 'GET_ALL_ORDERS': {
          console.log(action.orders);
        return action.orders;
      }
      case 'DISPATCH_ORDER_SUCCESS': {
          return [...state].map(i => {
              if (i.id === action.id) {
                  i.status = 'waitPark';
              }
              return i;
          })
      }
      default:
        return state;
    }
  };
  