import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import "./signup.css";
import char from "../comp/assets/char.png";

const LoginPage = () => {
    // State variables to hold form data
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct request body
        const requestBody = {
            email: email,
            password: password
        };

        try {
            // Make POST request to login API endpoint
            // const response = await fetch('http://3.111.17.212:3001/api/v1/user/signin', {
                const response = await fetch(' http://3.111.17.212:3001/api/v1/user/signin', {

           
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            // Handle response
            if (response.ok) {
                const responseData = await response.json();
                console.log('Login successful:', responseData);
                // Handle successful login
            } else {
                console.error('Login failed');
                // Handle failed login
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    return (
        <>
            <div className="main_container">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12">
                            <div className="left_img_div">
                                <img src={char} alt="image" />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12">
                            <div className="bottom_layer_bg">
                                <div className="right_form_div">
                                    <Form onSubmit={handleSubmit} autoComplete="off">
                                        <Form.Label className="form_lable_head">Login</Form.Label>
                                        <span className="border_bottom"></span>
                                        <Form.Group controlId="email">
                                            <Form.Label className="form_lable_styel">Email Address</Form.Label>
                                            <Form.Control className="form_input_style" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                        </Form.Group>
                                        <Form.Group controlId="password">
                                            <Form.Label className="form_lable_styel">Password</Form.Label>
                                            <Form.Control className="form_input_style" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                        </Form.Group>
                                        <Button className="btn_bg_paper mt-4" size="lg" type="submit">Login</Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
