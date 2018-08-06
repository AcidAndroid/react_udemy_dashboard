import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
import { List, Avatar } from 'antd';
import { Spin } from 'antd'



class Profile extends Component {

   
    render() {
        const {user_data,events_data
            ,followers_data
            ,following_data}= this.props
        
        {console.log(this.props)}
        return (
            <React.Fragment>

                
                {user_data ?
                <div>
                    <div id="DatosPerfil" className="name-container">                
                        <h1>{user_data.name}</h1>
                        <Avatar size="large" icon="user"
                        src={user_data.avatar_url}
                        />                
                    </div>
                    <p>{user_data.bio}</p>       
                </div>                     
                    :
                    <div>
                        <Spin />
                    </div>
                }

               
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="Actividades recientes" >                  
                        
                            <List
                                itemLayout="horizontal"
                                dataSource={events_data}
                                pagination={{pageSize:3}}
                                renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta                                
                                    title={item.type}
                                    description={item.repo.name}
                                    />
                                </List.Item>
                                )}
                            />
                            
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Seguidores" >
                        
                            <List
                                itemLayout="horizontal"
                                dataSource={followers_data}
                                pagination={{pageSize:5}}
                                renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar_url}/>}
                                        title={<a href={item.html_url}>{item.login}</a>}                                    
                                    />
                                </List.Item>
                                )}
                            />

                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Siguiendo" >
                            <List
                                itemLayout="horizontal"
                                dataSource={following_data}
                                pagination={{pageSize:5}}
                                renderItem={item => (
                                    <List.Item>
                                    <List.Item.Meta                                        
                                        avatar={<Avatar src={item.avatar_url}/>}
                                        title={<a href={item.html_url}>{item.html_url}</a>}                                    
                                    />
                                </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default Profile;