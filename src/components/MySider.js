import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'
const { Sider } = Layout;

export default class MySider extends React.Component {
    componentDidMount() {
        const url = window.location.href.split('/');
        console.log((url[url.length-1]))
        this.props.setSiderStatus(url[url.length-1]);
        
    }
    setSiderStatus(status) {
        this.props.setSiderStatus(status);
    }
    render() {
        const status = this.props.status;
        console.log(status)
        return (
            
            <Sider width={200} style={{ background: '#fff' }}>
            
                <Menu
                    mode="inline"
                    selectedKeys={[status]}
                    style={{ height: '100%' }}
                >
                    
                {localStorage.getItem("role")==="ROLE_ADMIN"? 
                    <Menu.Item key="EmployeeManage">
                        <Link to="/App/EmployeeManage" onClick={() => this.setSiderStatus('EmployeeManage')}>
                            <Icon type="form" />
                            <span>员工管理</span>
                        </Link>
                    </Menu.Item>
                :<div />}

                {localStorage.getItem("role")==="ROLE_ADMIN" || localStorage.getItem("role")==="ROLE_MANAGER" ?
                    <Menu.Item key="ParkingLotManage">
                        <Link to="/App/ParkingLotManage" onClick={() => this.setSiderStatus('ParkingLotManage')}>
                            <Icon type="form" />
                            <span>停车场管理</span>
                        </Link>
                    </Menu.Item>
                :<div />}

                {localStorage.getItem("role")==="ROLE_ADMIN" || localStorage.getItem("role")==="ROLE_MANAGER" ?
                    <Menu.Item key="ParkingBoyManage">
                        <Link to="/App/ParkingBoyManage" onClick={() => this.setSiderStatus('ParkingBoyManage')}>
                            <Icon type="form" />
                            <span>停车员管理</span>
                        </Link>
                    </Menu.Item>
                :<div />}
                
                {localStorage.getItem("role")==="ROLE_ADMIN" || localStorage.getItem("role")==="ROLE_MANAGER" ?
                    <Menu.Item key="ParkingLotDashboard">
                        <Link to="/App/ParkingLotDashboard" onClick={() => this.setSiderStatus('ParkingLotDashboard')}>
                            <Icon type="form" />
                            <span>停车场Dashboard</span>
                        </Link>
                    </Menu.Item>
                :<div />}
                
                {localStorage.getItem("role")==="ROLE_ADMIN" || localStorage.getItem("role")==="ROLE_MANAGER" ?
                    <Menu.Item key="OrderManage">
                        <Link to="/App/OrderManage"  onClick={() => this.setSiderStatus('OrderManage')}>
                            <Icon type="form" />
                            <span>订单管理</span>
                        </Link>
                    </Menu.Item>
                :<div />}

                </Menu>

                                    
            </Sider>
            
        );
    }
}