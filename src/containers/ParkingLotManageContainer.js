import { connect } from 'react-redux';
import ParkingLotManage from "../components/parkingLot/ParkingLotManage";
import ResourceAPi from '../api/ResourceAPI';
import {getAllParkingLots,getSearchParkingLots} from '../actions'

const mapStateToProps = (state, ownProps) => {
    console.log(state.parkinglots)
    return {
      parkingLots: state.parkinglots
      
    };
  };
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAllParkingLots: () => {
            ResourceAPi.getAllParkingLots(parkingLots => dispatch(getAllParkingLots(parkingLots)))
        },
        getSearchEmployees: (optionValue,value) =>{
            ResourceAPi.searchParkingLots(optionValue,value,parkingLots => dispatch(getSearchParkingLots(parkingLots)))
        }
    }
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ParkingLotManage);