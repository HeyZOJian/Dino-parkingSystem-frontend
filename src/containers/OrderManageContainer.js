import { connect } from 'react-redux';
import OrderManage from "../components/order/OrderManage";
import ResourceAPi from '../api/ResourceAPI';
import {getAllOrders, getAllParkingBoys, dispatchOrderSuccess} from '../actions';

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
        getActiveParkingBoys: () => {
            ResourceAPi.getActiveParkingBoys(parkingBoys => dispatch(getAllParkingBoys(parkingBoys)));
        },
        dispatchOrderSuccess: (id) => dispatch(dispatchOrderSuccess(id)),
    }
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderManage);