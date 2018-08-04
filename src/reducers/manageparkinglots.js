export default (state = [], action) => {
    switch (action.type) {
        case 'GET_NO_MANAGED_PARKINGLOTS': {
            console.log(action.parkingLots);
            state[0] = action.parkingLots;
            return state;
        }
        case 'GET_PARKINGLOTS_BY_PARKINGBOY_ID': {
            console.log(action.parkingLots);
            state.push(action.parkingLots);
            console.log(state);
            return state;
        }

        default:
            return state;
    }
};
