import { connect } from 'react-redux';
import ParkingBoyManage from "../components/parkingBoy/ParkingBoyManage";
import ResourceAPi from '../api/ResourceAPI';
import {getAllParkingBoys} from '../actions';

const mapStateToProps = (state, ownProps) => {
    return {
        parkingBoys: state.parkingboys
    };
  };
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAllParkingBoys: () => {
            ResourceAPi.getAllParkingBoys(parkingBoys => dispatch(getAllParkingBoys(parkingBoys)));
        },
    }
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ParkingBoyManage);