import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState();
  const [info, setInfo] = useState();
  const [otpComp, setOptComp] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);

    let data1 = JSON.stringify({
      "email": data?.email
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://52.66.87.72:5555/api/v1/otp/getotp',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data1
    };

    axios.request(config)
      .then((response) => {
        // console.log('object',JSON.stringify(response.data))
        var resp = JSON.stringify(response.data.status)

        // console.log('kalyan1',200 == resp);
          if(200 == resp){
            alert('otp has been sent to your email id..!')
          setInfo(data)
        setOptComp(true);
          }else{
            alert(JSON.stringify(response.data.message))
        // setInfo(data)
        navigate("/sign");
          }
     
      })
      .catch((error) => {
        // console.log(error);
        alert('some thing went wrong')
      });
  };
  // console.log(info)
  const handleVerify = () => {

    var data = JSON.stringify({...info,
      "otp":otp
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://52.66.87.72:5555/api/v1/otp/validateotp',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {

var resp = JSON.stringify(response.data.status)
      if(200 == resp){
        // console.log(JSON.stringify(response.data));
      alert("Registration successfully completed!");
    navigate("/");
      }else{
        alert(JSON.stringify(response.data.message))
    // setInfo(data)
    navigate("/sign");
      }

    })
    .catch((error) => {
      // console.log(error);
    alert("Please Enter Valid OTP");

    });
  };

const handleLogin =() =>{
  navigate("/");

}

  return (
    <Box sx={{ margin: 4, width: "250px" }}>
      {!otpComp ? (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            Signup
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  {...register("name", { required: "Name is required" })}
                  label="Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  {...register("mobile", {
                    required: "Mobile is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid mobile number",
                    },
                  })}
                  label="Mobile"
                  fullWidth
                  error={!!errors.mobile}
                  helperText={errors.mobile ? errors.mobile.message : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  label="Email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  label="Password"
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 ,textTransform:"capitalize"}}
            >
              Submit
            </Button>
            <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
               style={{backgroundColor:"whitesmoke",color:"blue"}}
              fullWidth
              onClick={handleLogin}
              sx={{ mt: 2 ,textTransform:"capitalize"}}
            >
              Existing User? Log in
            </Button>
              </Grid>
          </form>
        </>
      ) : (
        <>
          <TextField
            {...register("otp", { required: "OTP is required" })}
            label="Enter OTP"
            fullWidth
            error={!!errors.otp}
            size="small"
            onChange={(e)=>setOtp(e.target.value)}
            helperText={errors.otp ? errors.otp.message : ""}
          />
          <Typography
            onClick={() => setOptComp(!otpComp)}
            style={{ fontSize: "0.8em", color: "blue" }}
          >
            {"<"} Back to Sign-Up Page?
          </Typography>
          <Button
            variant="contained"
            onClick={handleVerify}
            color="primary"
            fullWidth
            sx={{ marginTop: 1,textTransform:"capitalize" }}
          >
            Verify
          </Button>
        </>
      )}
    </Box>
  );
};

export default SignUp;
