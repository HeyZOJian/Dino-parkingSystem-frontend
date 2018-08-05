import { connect } from 'react-redux';
import OrderManage from "../components/order/OrderManage";
import ResourceAPi from '../api/ResourceAPI';
import {getAllOrders, getAllParkingBoys, dispatchOrderSuccess,getSearchOrders} from '../actions';
import {TYPE_PARKCAR,TYPE_PARKOUTCAR,STATUS_PARKED,STATUS_NOROB,STATUS_WAITCUSTOMER,STATUS_WAITPARK,STATUS_WAITUNPARK,STATUS_FINISH} from '../constant/constant'

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
        getSearchOrders: (optionValue,value) =>{
            let inputValue = '';
            if(optionValue=="type"){
                if(value==""){
                    inputValue='';
                }else if(value=="取车"){
                     inputValue = TYPE_PARKOUTCAR;
                }else if(value=="停车"){
                    inputValue = TYPE_PARKCAR;
                }else{
                    alert("请输入停车类型：停车、取车");
                }
            }
            if(optionValue=="status"){
                if(value==""){
                    inputValue='';
                }else if(value=="停车完成"){
                     inputValue = STATUS_PARKED;
                }else if(value=="无人处理"){
                    inputValue = STATUS_NOROB;
                }else if(value=="等待客户取车"){
                    inputValue = STATUS_WAITCUSTOMER;
                }
                else if(value=="等待停车"){
                    inputValue = STATUS_WAITPARK;
                }
                else if(value=="取车中"){
                    inputValue = STATUS_WAITUNPARK;
                }
                else if(value=="取车完成"){
                    inputValue = STATUS_FINISH;
                }
                else{
                    alert("请输入停车状态：停车完成、无人处理、等待客户取车、等待停车、取车中、取车完成");
                }
            }

            
            console.log(optionValue);
            console.log(value);
            ResourceAPi.searchOrders(optionValue,inputValue,employees => dispatch(getSearchOrders(employees)))
        },
    }
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderManage);