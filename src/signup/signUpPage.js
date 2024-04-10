import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import "./signup.css";
import char from "../comp/assets/char.png";

const SignUpPage = () => {
    // State variables to hold form data
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct request body
        const requestBody = {
            name: name,
            mobile: mobile,
            email: email,
            password: password
        };

        try {
            // Make POST request to API endpoint
            const response = await fetch('http://3.111.17.212:3001/api/v1/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            // Handle response
            if (response.ok) {
                const responseData = await response.json();
                console.log('Signup successful:', responseData);
                // Handle successful signup
            } else {
                console.error('Signup failed');
                // Handle failed signup
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
                                    <Form onSubmit={handleSubmit} autocomplete="off">
                                        <Form.Label className="form_lable_head">Sign Up</Form.Label>
                                        <span className="border_bottom"></span>

                                        <Form.Group controlId="fullName">
                                            <Form.Label className="form_lable_styel">Full Name</Form.Label>
                                            <Form.Control className="form_input_style" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                                        </Form.Group>
                                        <Form.Group controlId="mobile">
                                            <Form.Label className="form_lable_styel">Contact No.</Form.Label>
                                            <Form.Control className="form_input_style" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                                        </Form.Group>
                                        <Form.Group controlId="email">
                                            <Form.Label className="form_lable_styel">Email Address</Form.Label>
                                            <Form.Control className="form_input_style" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                        </Form.Group>
                                        <Form.Group controlId="password">
                                            <Form.Label className="form_lable_styel">Password</Form.Label>
                                            <Form.Control className="form_input_style" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                        </Form.Group>
                                        <Button className="btn_bg_paper mt-4" size="lg" type="submit">Sign Up</Button>
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

export default SignUpPage;
