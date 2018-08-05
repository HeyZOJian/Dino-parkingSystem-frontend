import ResourceAPI from '../api/ResourceAPI';
import * as types from '../constant/constant'

export default (state = [], action) => {
    switch (action.type) {
      case 'GET_ALL_PARKINGBOYS': {
          console.log(action.parkingBoys);
          const parkingBoys = [];
          const length = action.parkingBoys.length
          for(let i=0;i<length;i++){
            parkingBoys[i]=action.parkingBoys[i];
            parkingBoys[i].workStatus=changeWords(action.parkingBoys[i].workStatus)
          }
        return parkingBoys;
      }
      default:
        return state;
    }
  };
  
  const changeWords=(keyWord)=>{
    switch(keyWord){
      case types.STATUS_ONDUTY:return "上班";
      case types.STATUS_OFFDUTY:return "下班";

      case types.STATUS_LATE:return "迟到";
      case types.STATUS_LEAVE:return "请假";
    }
  }