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
        console.log(state)
        console.log(state.filter(parkingLot => action.parkingLotsIds.some(id => id === parkingLot.id)))
        console.log(action.parkingLots)
        return action.direction === 'right' ?
          state.filter(parkingLot => action.parkingLotsIds.every(id => id != parkingLot.id)) :
          state.concat(action.parkingLots) 
      }
      default:
        return state;
    }
  };
  