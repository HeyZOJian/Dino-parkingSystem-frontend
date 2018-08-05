import React, { Component } from 'react';
import { Layout ,Col,Avatar,Row,Button,Icon} from 'antd';
import {BrowserRouter as Router, Route} from 'react-router-dom'

// import  MyHeader  from "./components/MyHeader";
import  ParkingLotManage  from "./containers/ParkingLotManageContainer";
import  ParkingBoyManage  from "./containers/ParkingBoyManageContainer";
import  ParkingLotDashboard  from "./containers/ParkingLotDashboardContainer";
import  OrderManage  from "./containers/OrderManageContainer";
import  MyFooter  from "./components/MyFooter";
import EmployeeManage from './containers/EmployeeManageContainer';
import WrappedAddEmployee from './components/employee/AddEmployee';
import MySider from './containers/MySiderContainer';

const {Content,Header} = Layout;

class App extends Component {

a=()=>{
console.log(1)
}
  


  render() {
    return (
      <div>
        <Router>
        <Layout>
          <Header className="header">
            <Row>
              <Col span={14}></Col>
              <Col span={9} style={{textAlign:"right"  }}>
             
              &nbsp;&nbsp;<span style={{  color: 'white' }}>Admin，欢迎您</span>
              <Avatar style={{  backgroundColor: '#1890ff',marginLeft: 13,marginTop:-4,fontSize:16}} icon="logout" onClick={()=>{localStorage.clear("nikname");window.location.href="../"}}/>
              </Col>     
            </Row>      
          </Header>

          <Content style={{ padding: '0 50px', marginTop: 20}}>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
     
              <MySider />
              
            {localStorage.getItem("role")==="ROLE_ADMIN"? 
              <Route exact path="/App/EmployeeManage" component={EmployeeManage}></Route>
            :<Route />}

            {localStorage.getItem("role")==="ROLE_ADMIN" || localStorage.getItem("role")==="ROLE_MANAGER" ?
              <Route  path="/App/ParkingLotManage" component={ParkingLotManage}></Route> 
            :<Route />}  

            {localStorage.getItem("role")==="ROLE_ADMIN" || localStorage.getItem("role")==="ROLE_MANAGER" ? 
              <Route  path="/App/ParkingBoyManage" component={ParkingBoyManage}></Route>
            :<Route />} 

            {localStorage.getItem("role")==="ROLE_ADMIN" || localStorage.getItem("role")==="ROLE_MANAGER" ?
              <Route  path="/App/ParkingLotDashboard" component={ParkingLotDashboard}></Route> 
            :<Route />} 

            {localStorage.getItem("role")==="ROLE_ADMIN" || localStorage.getItem("role")==="ROLE_MANAGER" ? 
              <Route  path="/App/OrderManage" component={OrderManage}></Route>   
            :<Route />} 

            {localStorage.getItem("role")==="ROLE_ADMIN" || localStorage.getItem("role")==="ROLE_MANAGER" ? 
              <Route path="/App/AddEmployee" component={WrappedAddEmployee}></Route>
            :<Route />} 

            </Layout>
          </Content>

          <MyFooter />
        </Layout>
        </Router>
      </div>
    );
  }
}

export default App;
