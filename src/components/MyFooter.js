import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Footer } = Layout;

export default class MyFooter extends React.Component {
    render() {
        return (
            <div>
                <Footer style={{ textAlign: 'center' }}>
                 Parking System ©2018 Created by Dino
                </Footer>
            </div>
        );
    }
}