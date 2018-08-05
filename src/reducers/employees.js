import ResourceAPI from '../api/ResourceAPI';

export default (state = [], action) => {
    switch (action.type) {
      case 'GET_ALL_EMPLOYEES': {
          const orders = [];
          const length = action.orders.length
          for(let i=0;i<length;i++){
            orders[i]=action.orders[i];
            orders[i].type=changeWords(action.orders[i].type)
            orders[i].status=changeWords(action.orders[i].status)
          }

        return action.employees;
      }
      case 'GET_SEARCH_EMPLOYEES':{
        console.log(action.employees)
        return action.employees
      }
      case 'UPDATE_EMPLOYEE_STATUS': {
        return state.map(employee => {
          if (employee.id === action.id) {
            employee.status = employee.status ? false : true;
          }
          return employee;
        })
      }
      default:
        return state;
    }
  };
  