export const showParkingLotsList = (list) => ({ type: 'SHOW_PARKINGLOTSLIST',list})
export const getAllEmployees = (employees) => ({type: 'GET_ALL_EMPLOYEES', employees})
export const getAllParkingLots = (parkingLots) => ({type: 'GET_ALL_PARKINGLOTS', parkingLots})
export const setSiderStatus = (status) => ({type: 'GET_SIDER_STATUS', status})
export const getAllOrders = (orders) => ({type: 'GET_ALL_ORDERS', orders})
export const getAllParkingBoys = (parkingBoys) => ({type: 'GET_ALL_PARKINGBOYS', parkingBoys})
export const dispatchOrderSuccess = (id) => ({type: 'DISPATCH_ORDER_SUCCESS', id})
export const getNoManagedParkingLots = (parkingLots) => ({type: 'GET_NO_MANAGED_PARKINGLOTS', parkingLots})
export const getParkingLotsByParkingBoyId = (parkingLots) => ({type: 'GET_PARKINGLOTS_BY_PARKINGBOY_ID', parkingLots})
export const getSearchEmployees = (employees) => ({type: 'GET_SEARCH_EMPLOYEES', employees})
export const updateManagedParkingLots = (direction, parkingLotsIds, parkingLots) => ({type: 'UPDATE_MANAGED_PARKINGLOTS', direction, parkingLotsIds, parkingLots})
export const updateNoManagedParkingLots = (direction, parkingLotsIds, parkingLots) => ({type: 'UPDATE_NO_MANAGED_PARKINGLOTS', direction, parkingLotsIds, parkingLots})
export const updateEmployeeStatus = (id) => ({type: 'UPDATE_EMPLOYEE_STATUS', id})
export const updateParkingLotStatus = (id) => ({type: 'UPDATE_PARKINGLOT_STATUS', id})
export const updateParkingBoyStatus = (id) => ({type: 'UPDATE_PARKINGBOY_STATUS', id})
