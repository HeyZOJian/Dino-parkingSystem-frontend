import { connect } from 'react-redux';
import EmployeeManage from "../components/employee/EmployeeManage";
import ResourceAPi from '../api/ResourceAPI';
import {getAllEmployees,getSearchEmployees, updateEmployeeStatus} from '../actions';

const mapStateToProps = (state, ownProps) => {
    console.log(state.employees);

    return {
      employees: state.employees,

    };
  };
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAllEmployees: () => {
            ResourceAPi.getAllEmployees(employees => dispatch(getAllEmployees(employees)));
            
        },
        getSearchEmployees: (optionValue,value) =>{
            console.log(optionValue);
            console.log(value);
            ResourceAPi.searchEmployees(optionValue,value,employees => dispatch(getSearchEmployees(employees)))
        },
        updateEmployeeStatus: (id, status) => {
            ResourceAPi.updateEmployeeStatus(id, status, () => dispatch(updateEmployeeStatus(id)));
        }
    }
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeManage);