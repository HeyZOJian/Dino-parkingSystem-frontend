

    import { combineReducers } from 'redux';
    import employees from './employees';
    import dashboard from './dashboard';
    import parkinglots from './parkinglots';
    import mysider from './mysider'
    import orders from './orders'
    import parkingboys from './parkingboys'
    import managedparkinglots from './managedparkinglots'
    export default combineReducers({    employees,dashboard, parkinglots, mysider, orders, parkingboys, managedparkinglots  });   


    
    
    

