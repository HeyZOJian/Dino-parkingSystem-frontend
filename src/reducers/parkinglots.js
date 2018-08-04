import ResourceAPI from '../api/ResourceAPI';

export default (state = [], action) => {
    switch (action.type) {
      case 'GET_ALL_PARKINGLOTS': {
          console.log(action.parkingLots);
        return action.parkingLots;
      }
      
      default:
        return state;
    }
  };
  