import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
 const handleVerify=()=>{
  navigate("/");
 }
  return <>

<h1>
  WELL COME PAGE  
</h1>
      <Button
            variant="contained"
            onClick={handleVerify}
            color="primary"
            sx={{ marginTop: 1 ,}}
          >
            Log-Out
      </Button>
  </>;
};

export default LandingPage;
