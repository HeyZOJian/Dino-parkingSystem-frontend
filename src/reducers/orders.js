import ResourceAPI from '../api/ResourceAPI';
import * as types from '../constant/constant'
export default (state = [], action) => {
    switch (action.type) {
      case 'GET_ALL_ORDERS': {
          console.log(action.orders);
          const orders = [];
          const length = action.orders.length
          for(let i=0;i<length;i++){
            orders[i]=action.orders[i];
            orders[i].type=changeWords(action.orders[i].type)
            orders[i].status=changeWords(action.orders[i].status)
          }
        return orders;
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

  const changeWords=(keyWord)=>{
    switch(keyWord){
      case types.TYPE_PARKCAR:return "停车";
      case types.TYPE_PARKOUTCAR:return "取车";

      case types.STATUS_NOROB:return "无人处理";
      case types.STATUS_WAITPARK:return "正在停车";
      case types.STATUS_PARKED:return "停车完成";
      case types.STATUS_WAITCUSTOMER:return "等待顾客取车";
      case types.STATUS_WAITUNPARK:return "正在取车";
      case types.STATUS_FINISH:return "完成";
    }
  }