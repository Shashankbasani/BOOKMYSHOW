import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import './register.css';
import { RegisterUser } from '../../API/users';
import { Link } from 'react-router-dom';


function Register(){
    const onFinish = async(values)=>{
        const response = await RegisterUser(values);
        if(response.success){
            window.location.href ='/login';
            console.log(response);
        }else{
            console.log(response.message)
        }
        
    }
    return (
        <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
            <section className="left-section">
                <h1>
                SignUp to BookMyShow
                </h1>
            </section>
            <section className="right-section">
                <Form
                layout='vertical'
                onFinish={onFinish}
                >
                    <Form.Item
                label="name"
                htmlFor="name"
                name="name"
                className="d-block"
                rules={[{ required: true, message: "name is required" }]}
                >
                <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                ></Input>
                </Form.Item>
                <Form.Item
                label="Email"
                htmlFor="email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: "Email is required" }]}
                >
                <Input
                id="email"
                type="text"
                placeholder="Enter your Email"
                ></Input>
                </Form.Item>
                <Form.Item
                label="Password"
                htmlFor="password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Password is required" }]}
                >
                <Input
                id="password"
                type="password"
                placeholder="Enter your Password"
                ></Input>
                </Form.Item>
                <Form.Item className="d-block">
                <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                SignUp
                </Button>
                </Form.Item>
                </Form>
            </section>
        </main>
        <Link to={'/'}>login</Link>
        </header>
        )
}

export default Register;