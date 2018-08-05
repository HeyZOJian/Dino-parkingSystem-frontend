import ResourceAPI from '../api/ResourceAPI';

export default (state = [], action) => {
    switch (action.type) {
      case 'GET_ALL_PARKINGBOYS': {
          console.log(action.parkingBoys);
        return action.parkingBoys;
      }
      case 'GET_SEARCH_PARKINGBOYS':{
        return action.parkingBoys;
      }
      default:
        return state;
    }
  };
  