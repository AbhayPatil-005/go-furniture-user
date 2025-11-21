import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";


const PleaseLogin =()=>{
    const navigate = useNavigate();
    return(
        <div className="container py-5 text-center">
            <h4>Please login to complete your order</h4>
            <Button
                className="mt-3"
                onClick={() => navigate("/login")}
            >
                Login to Continue
            </Button>
        </div>
    )
}

export default PleaseLogin;