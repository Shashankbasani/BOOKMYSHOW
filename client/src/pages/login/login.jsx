import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import './login.css';
import { LoginUser } from '../../API/users';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { message } from 'antd';
import { CurrentUsers } from '../../API/users';
function Login() {

    const navigate = useNavigate();

    const onFinish = async(values)=>{
        const response = await LoginUser(values);
        if(response.success){
            localStorage.setItem('token',response.token)
            window.location.href ='/';
            console.log(response);
            message.success("User Logged In")
        }else{
            console.log(response.message)
            message.error(response.message);
        }
    }

    useEffect(()=>{
        const checkLogin = async()=>{
        const response = await CurrentUsers();
            const log = response.success
       if(localStorage.getItem('token') && log){
        navigate("/");
       }
    }
    checkLogin();
    },[])

    return (
    <header className="App-header">
    <main className="main-area mw-500 text-center px-3">
        <section className="left-section">
            <h1>
            Login to BookMyShow
            </h1>
        </section>
        <section className="right-section">
            <Form
            layout='vertical'
            onFinish={onFinish}
            >
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
            Login
            </Button>
            </Form.Item>
            </Form>
        </section>
    </main>
    <Link to={"/register"}>SignUp</Link>
    </header>
    )
    }
    export default Login;
