import { connect } from 'react-redux';
import ParkingBoyManage from "../components/parkingBoy/ParkingBoyManage";
import ResourceAPi from '../api/ResourceAPI';
import {getAllParkingBoys, getSearchParkingBoys, getParkingLotsByParkingBoyId, getAllParkingLots,
    updateManagedParkingLots, updateNoManagedParkingLots} from '../actions';
import {STATUS_ONDUTY,STATUS_OFFDUTY,STATUS_LATE,STATUS_LEAVE} from '../constant/constant'

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
            let inputValue = '';
            if(value==""){
                inputValue='';
            }else if(value=="上班"){
                 inputValue = STATUS_ONDUTY;
            }else if(value=="下班"){
                inputValue = STATUS_OFFDUTY
            }else if(value == "请假"){
                inputValue = STATUS_LEAVE
            }else if(value == "迟到"){
                inputValue = STATUS_LATE
            }else{
                alert("请输入员工状态：上班、下班、请假、迟到");
            }
            console.log(optionValue)
            console.log(value)
            ResourceAPi.searchParkingBoys(optionValue,inputValue,employees => dispatch(getSearchParkingBoys(employees)))
        }

    }
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ParkingBoyManage);