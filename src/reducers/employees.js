import ResourceAPI from '../api/ResourceAPI';

export default (state = [], action) => {
    switch (action.type) {
      case 'GET_ALL_EMPLOYEES': {
          console.log(action.employees);
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
  