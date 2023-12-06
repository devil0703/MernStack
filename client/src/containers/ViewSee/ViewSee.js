import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Space, Table, Tag } from 'antd';
import { Divider, Flex, Radio } from 'antd';
import { withRouter } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';
import {moment} from'moment';
import { getAllClient, getExpert, getNormal } from '../../store/actions/hotkeyActions';

class ViewSee extends Component {
    constructor(props){
        super(props);
        props.getAllClient();
        this.state = {
            clients: [],
            data: []
        }
    }
    
    componentWillReceiveProps(props){
        let datalist = [];
        props.clients.map((item, index)=>{
            let date = new Date(item.time);
            let newtime = date.getFullYear() +
                            '-' +
                            String(date.getMonth() + 1).padStart(2, '0') +
                            '-' +
                            String(date.getDate()).padStart(2, '0') +
                            ' ' +
                            String(date.getHours()).padStart(2, '0') +
                            ':' +
                            String(date.getMinutes()).padStart(2, '0') +
                            ':' +
                            String(date.getSeconds()).padStart(2, '0');
            const newdata = {
                key: index,
                name: item.username,
                ipaddress: item.ipaddress,
                // date: moment(item.time).format('dddd, MMMM Do, YYYY h:mm:ss A')
                date: newtime
            }
            datalist.push(newdata);
        })
        this.setState({
            data: datalist
        })   
    }
    detailClick = (ipaddress)=>{
        window.location.href = "/viewdetail/"+ipaddress;
    }
    columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          sorter: (a, b) => a.name - b.name,
        },
        {
          title: 'Ipaddress',
          dataIndex: 'ipaddress',
          key: 'ipaddress',
        },
        {
            title: 'Last Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <Button type="primary" onClick={()=> this.detailClick(record.ipaddress)} icon={<EyeOutlined />}>View</Button>
            </Space>
          ),
        },
      ];
      
    render() {
        
        return(
            <div style={{margin: '100px'}}>
                <Table  columns={this.columns} dataSource={this.state.data} />
            </div>
        )
    }

}
const mapStateToProps = state => {
    return {
        clients: state.hotkeys.clients,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getNormal: () => dispatch(getNormal()),
        getExpert: () => dispatch(getExpert()),
        getAllClient: () => dispatch(getAllClient())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewSee);