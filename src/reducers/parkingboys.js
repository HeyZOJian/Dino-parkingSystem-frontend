import ResourceAPI from '../api/ResourceAPI';

export default (state = [], action) => {
    switch (action.type) {
      case 'GET_ALL_PARKINGBOYS': {
          console.log(action.parkingBoys);
        return action.parkingBoys;
      }
      case 'UPDATE_PARKINGBOY_STATUS': {
        return state.map(parkingBoy => {
          if (parkingBoy.id === action.id) {
            parkingBoy.status = parkingBoy.status ? false : true;
          }
          return parkingBoy;
        })
      }
      default:
        return state;
    }
  };
  