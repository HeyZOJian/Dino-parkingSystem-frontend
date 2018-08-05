import { connect } from 'react-redux';
import ParkingBoyManage from "../components/parkingBoy/ParkingBoyManage";
import ResourceAPi from '../api/ResourceAPI';
import {getAllParkingBoys, getSearchParkingBoys, getParkingLotsByParkingBoyId, getAllParkingLots,
    updateManagedParkingLots, updateNoManagedParkingLots} from '../actions';

const mapStateToProps = (state, ownProps) => {
    return {
        parkingBoys: state.parkingboys,
        managedParkingLots: state.managedparkinglots,
        parkingLots: state.parkinglots,
    };
  };
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAllParkingBoys: () => {
            ResourceAPi.getAllParkingBoys(parkingBoys => dispatch(getAllParkingBoys(parkingBoys)));
        },
        getNoManagedParkingLots: () => {
            ResourceAPi.getNoManagedParkingLots(parkingLots => dispatch(getAllParkingLots(parkingLots)));
        },
        getParkingLotsByParkingBoyId: (id, setState) => {
            ResourceAPi.getParkingLotsByParkingBoyId(id, (parkingLots) => {
                dispatch(getParkingLotsByParkingBoyId(parkingLots));
                setState();
            })
        },
        manageParkingBoysParkingLots: (id, direction, parkingLotsIds, parkingLots) => {
            const operation = direction === 'right' ? 'add' : 'remove';
            ResourceAPi.manageParkingBoysParkingLots(id, operation, parkingLotsIds,
                () => {
                    dispatch(updateManagedParkingLots(direction, parkingLotsIds, parkingLots));
                    dispatch(updateNoManagedParkingLots(direction, parkingLotsIds, parkingLots));
                })
        },
        getSearchParkingBoys: (optionValue,value) =>{
            console.log(value)
            ResourceAPi.searchParkingBoys(optionValue,value,employees => dispatch(getSearchParkingBoys(employees)))
        }

    }
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ParkingBoyManage);