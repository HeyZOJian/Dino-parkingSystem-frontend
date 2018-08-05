import ResourceAPI from '../api/ResourceAPI';

export default (state = [], action) => {
    switch (action.type) {
      case 'GET_ALL_EMPLOYEES': {
          console.log(action.employees);
        return action.employees.map(employee => {
          employee.position = changeWords(employee.position);
          return employee;
        });
      }
      case 'GET_SEARCH_EMPLOYEES':{
        console.log(action.employees)
        return action.employees.map(employee => {
          employee.position = changeWords(employee.position);
          return employee;
        });
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

  const changeWords = (keyWord) => {
    switch (keyWord) {
      case "ROLE_ADMIN": return '管理员';
      case "ROLE_MANAGER": return '经理';
      case "ROLE_PARKINGBOY": return '停车员';
    }
  }
  