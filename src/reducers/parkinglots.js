import ResourceAPI from '../api/ResourceAPI';

export default (state = [], action) => {
    switch (action.type) {
      case 'GET_ALL_PARKINGLOTS': {
          console.log(action.parkingLots);
        return action.parkingLots;
      }
      case 'GET_SEARCH_PARKINGLOTS':{
        console.log(action.parkingLots);
        return action.parkingLots;
    }
      case 'UPDATE_NO_MANAGED_PARKINGLOTS': {
        return action.direction === 'right' ?
          state.filter(parkingLot => action.parkingLotsIds.every(id => id != parkingLot.id)) :
          state.concat(action.parkingLots) 
      }
      case 'UPDATE_PARKINGLOT_STATUS': {
        return state.map(parkingLot => {
          if (parkingLot.id === action.id) {
            parkingLot.status = parkingLot.status ? false : true;
          }
          return parkingLot;
        })
      }
      default:
        return state;
    }
  };
  