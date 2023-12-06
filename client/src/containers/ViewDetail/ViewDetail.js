import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Space, Table, Tag } from 'antd';
import { Tabs } from 'antd';
import { Button, Divider, Flex, Radio } from 'antd';
import { getAllClient, getExpert, getNormal } from '../../store/actions/hotkeyActions';
class ViewDetail extends Component {
    constructor(props){
        super(props);
        console.log(props.match.params.ipaddress)
        props.getExpert(props.match.params.ipaddress);
        props.getNormal(props.match.params.ipaddress);
        this.state = {
            clients: [],
            normals: {},
            experts: [],
            items: []
        }
    }
    onChange = (key) => {
        console.log(key);
    };
    columns = [
        {
          title: 'Ipaddress',
          dataIndex: 'ipaddress',
          key: 'ipaddress',
        },
        {
            title: "Message",
            dataIndex: 'message',
            key: 'message'
        },
        {
            title: "Type",
            dataIndex: 'type',
            key: 'type',
            filters: [
                {
                  text: 'Email',
                  value: 'email',
                },
                {
                  text: 'Address',
                  value: 'address',
                },
                {
                    text: 'Key',
                    value: 'key',
                },
                {
                    text: 'Normal',
                    value: 'normal',
                },
              ],
              onFilter: (value, record) => record.type.indexOf(value) === 0,
            render: (_, { type }) => {
                let color;
                if(type == "email"){
                    color = "#87d068"
                }else if(type == "address"){
                    color = "#cd201f"
                }else if(type == "key"){
                    color = "#f50"
                }else{
                    color = "#55acee"
                }
                return (
                    <Tag color={color} key={type}>
                        {type.toUpperCase()}
                    </Tag>
                )       
            }
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
      ];
    componentWillReceiveProps(props){
        if(props.normals){
            console.log(props.normals)
            this.setState({
                normals: props.normals
            })
            
        }
        if(props.experts){
            let datalist = [];
            props.experts.map((item, index)=>{
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
                    ipaddress: item.ipaddress,
                    message: item.message,
                    type: item.type,
                    date: newtime
                }
                datalist.push(newdata);
            })
            this.setState({
                experts: datalist
            }) 
        }
        
    }
    render() {
        const item = [
            {
                key: '1',
                label: 'Normal',
                children: <div>
                    {this.state.normals.message}
                </div>,
            },
            {
                key: '2',
                label: 'Expert',
                children: <div>
                    <Table  columns={this.columns} dataSource={this.state.experts} />
                </div>,
            },
        ]; 
        return(
            <div style={{marginLeft: '100px', marginRight: '100px'}}>
                <Tabs defaultActiveKey="1" items={item} onChange={this.onChange} />
                
            </div>
        )
    }

}
const mapStateToProps = state => {
    return {
        clients: state.hotkeys.clients,
        normals: state.hotkeys.normals,
        experts: state.hotkeys.experts,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getNormal: (ipaddress) => dispatch(getNormal(ipaddress)),
        getExpert: (ipaddress) => dispatch(getExpert(ipaddress)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewDetail);