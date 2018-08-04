import React from 'react';
import {Layout} from 'antd';
import {Card, Col, Row} from 'antd';
import {Progress} from 'antd';

const {Content} = Layout;

class ParkingLotDashboard extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this
      .props
      .load();
  }

  render() {
    return (
      <Content style={{padding: '0 24px',minHeight: 280}}>
      <div>
          <Row gutter={16}>
            {/* <DashBoardCard/> */}
            <div>
              {this
                .props
                .lotsList
                .map(item => <Col xs={24} sm={20} md={12} lg={8} xl={6}>
                  <Card title={item.parkingLotName} style={{margin:"10px"}}>
                  <Row>
                    <Col span={12} >
                      <Progress xl={6} lg={12}
                        type="dashboard"
                        format={() => `${item.carNum}/${item.size}`}
                        percent={(item.carNum / item.size) * 100}/>
                    </Col>
                    <Col span={12} style={{fontSize:18,marginTop:50}}>停车员:{item.parkingBoyName}</Col>
                    </Row>
                    <Col offset={1} style={{marginLeft:30}}>停车情况</Col>
                  </Card>
                </Col>)}
            </div>
          </Row>
        </div>
      </Content>

    );
  }
}

export default ParkingLotDashboard;