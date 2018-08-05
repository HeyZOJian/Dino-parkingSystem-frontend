import { connect } from 'react-redux';
import EmployeeManage from "../components/employee/EmployeeManage";
import ResourceAPi from '../api/ResourceAPI';
import {getAllEmployees, updateEmployeeStatus} from '../actions';

const mapStateToProps = (state, ownProps) => {
    return {
      employees: state.employees
    };
  };
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getAllEmployees: () => {
            ResourceAPi.getAllEmployees(employees => dispatch(getAllEmployees(employees)));
        },
        updateEmployeeStatus: (id) => {
            dispatch(updateEmployeeStatus(id));
        }
    }
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EmployeeManage);