import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const Verify = () => {

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
        url: 'http://52.66.87.72:5555/api/v1/user/requestotp',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data1
      };
  
      axios.request(config)
        .then((response) => {
          var resp = JSON.stringify(response.data.status)
          // console.log('kalyan1',200 == resp);
            if(200 == resp){
              alert(JSON.stringify(response.data.message))
          setInfo(data)
          setOptComp(true);
            }else{
              alert(JSON.stringify(response.data.message))
          // setInfo(data)
          navigate("/");
            }
          // alert(JSON.stringify(response.data.message))
          // setInfo(data)
          // setOptComp(true);
        })
        .catch((error) => {
          // console.log(error);
          alert('some thing went wrong')
        });
    };
    // console.log(info)
    const handleVerify = () => {
      // var data = JSON.stringify({...info,
      //   "otp":otp
      // });
      var data =''
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://52.66.87.72:5555/api/v1/user/userotplogin/${otp}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        var resp = JSON.stringify(response.data.status)
        // console.log('kalyan1',JSON.stringify(response.data));
          if(200 == resp){
            // console.log(JSON.stringify(response.data));
        alert("You are successfully logged in..!");
         navigate("/home");
          }else{
            alert(JSON.stringify(response.data.message))
        // setInfo(data)
        navigate("/");
          }
       })
      .catch((error) => {
        // console.log(error);
      alert("Please Enter Valid OTP");
      });  
    };

  var handleSignUp = () =>{
    navigate("/sign");
  }


  return (
    <>
 <Box sx={{ margin: 4, width: "250px" }}>
      {!otpComp ? (
        <>

          <Typography variant="h4" align="center" gutterBottom>
            Sign-in
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} >
            <Grid container spacing={2}>

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
              {/* <Typography style={{color:'blue', fontSize:"0.8em", marginLeft:"6%"}} onClick={()=>navigate('/sign')}>{"< "}sign up</Typography> */}
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2,textTransform:"capitalize" }}
            >
              Request OTP
            </Button>
            <br/>
            <br/>

            <Typography
            variant="contained"
            onClick={handleSignUp}
            fullWidth
            sx={{ marginTop: 1,textTransform:"capitalize",color:"blue" }}
          >
           Click Create account
          </Typography>

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
            {"<"} back
          </Typography>
          <Button
            variant="contained"
            onClick={handleVerify}
            color="primary"
            fullWidth
            sx={{ marginTop: 1 }}
          >
            Verify
          </Button>

         


        </>
      )}
    </Box>
    </>
  )
}

export default Verify