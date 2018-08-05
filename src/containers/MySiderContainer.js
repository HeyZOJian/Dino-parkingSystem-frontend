import { connect } from 'react-redux';
import EmployeeManage from "../components/employee/EmployeeManage";
import MySider from '../components/MySider';
import ResourceAPi from '../api/ResourceAPI';
import {setSiderStatus, getAllParkingLots, getAllParkingBoys, getAllOrders, getAllEmployees, showParkingLotsList} from '../actions'
import ParkingLotDashboardAPI from '../api/ParkingLotDashboardAPI'

const mapStateToProps = (state, ownProps) => {
    return {
      status: state.mysider
    };
  };
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setSiderStatus: (status) => {
          dispatch(setSiderStatus(status));
          switch (status) {
            case 'ParkingLotManage': {
              ResourceAPi.getAllParkingLots(parkingLots => dispatch(getAllParkingLots(parkingLots)))
              break;
            }
            case 'ParkingBoyManage': {
              ResourceAPi.getAllParkingBoys(parkingBoys => dispatch(getAllParkingBoys(parkingBoys)));
              break;
            }
            case 'ParkingLotDashboard': {
              ParkingLotDashboardAPI.initServerData(dispatch, showParkingLotsList);
              break;
            }
            case 'OrderManage': {
              ResourceAPi.getAllOrders(orders => dispatch(getAllOrders(orders)));
              break;
            }
            default:
              ResourceAPi.getAllEmployees(employees => dispatch(getAllEmployees(employees)));
          }
        }
    }
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MySider);