import { connect } from 'react-redux';
import ParkingBoyManage from "../components/parkingBoy/ParkingBoyManage";
import ResourceAPi from '../api/ResourceAPI';
import {getAllParkingBoys, getNoManagedParkingLots, getParkingLotsByParkingBoyId} from '../actions';

const mapStateToProps = (state, ownProps) => {
    return {
        parkingBoys: state.parkingboys,
        parkingLots: state.manageparkinglots,
    };
  };
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAllParkingBoys: () => {
            ResourceAPi.getAllParkingBoys(parkingBoys => dispatch(getAllParkingBoys(parkingBoys)));
        },
        getNoManagedParkingLots: () => {
            ResourceAPi.getNoManagedParkingLots(parkingLots => dispatch(getNoManagedParkingLots(parkingLots)));
        },
        getParkingLotsByParkingBoyId: (id) => {
            ResourceAPi.getParkingLotsByParkingBoyId(id, (parkingLots) => {
                dispatch(getParkingLotsByParkingBoyId({id, parkingLots}));
            })
        }
    }
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ParkingBoyManage);