import { connect } from 'react-redux';
import OrderManage from "../components/order/OrderManage";
import ResourceAPi from '../api/ResourceAPI';
import {getAllOrders, getAllParkingBoys, dispatchOrderSuccess,getSearchOrders} from '../actions';

const mapStateToProps = (state, ownProps) => {
    return {
      orders: state.orders,
      parkingBoys: state.parkingboys
    };
  };
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAllOrders: () => {
            ResourceAPi.getAllOrders(orders => dispatch(getAllOrders(orders)));
        },
        getAllParkingBoys: () => {
            ResourceAPi.getAllParkingBoys(parkingBoys => dispatch(getAllParkingBoys(parkingBoys)));
        },
        dispatchOrderSuccess: (id) => dispatch(dispatchOrderSuccess(id)),
        getSearchOrders: (optionValue,value) =>{
            console.log(optionValue);
            console.log(value);
            ResourceAPi.searchOrders(optionValue,value,employees => dispatch(getSearchOrders(employees)))
        },
    }
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderManage);