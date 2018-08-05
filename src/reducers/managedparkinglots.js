export default (state = [], action) => {
    switch (action.type) {
        case 'GET_NO_MANAGED_PARKINGLOTS': {
            console.log(action.parkingLots);
            state[0] = action.parkingLots;
            return state;
        }
        case 'GET_PARKINGLOTS_BY_PARKINGBOY_ID': {
            // console.log(action.parkingLots);
            // state.push(action.parkingLots);
            // console.log(state);
            console.log(action.parkingLots);
            return action.parkingLots;
        }
        case 'UPDATE_MANAGED_PARKINGLOTS': {
            console.log(state)
            return action.direction === 'right' ? 
            state.concat(action.parkingLots) : 
            state.filter(parkingLot => action.parkingLotsIds.every(id => id != parkingLot.id))
        }

        default:
            return state;
    }
};
