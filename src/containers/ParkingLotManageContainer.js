import { connect } from 'react-redux';
import ParkingLotManage from "../components/parkingLot/ParkingLotManage";
import ResourceAPi from '../api/ResourceAPI';
import {getAllParkingLots, updateParkingLotStatus} from '../actions'

const mapStateToProps = (state, ownProps) => {
    return {
      parkingLots: state.parkinglots
    };
  };
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAllParkingLots: () => {
            ResourceAPi.getAllParkingLots(parkingLots => dispatch(getAllParkingLots(parkingLots)))
        },
        updateParkingLotStatus: (id) => {
            dispatch(updateParkingLotStatus(id));
        }
    }
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ParkingLotManage);