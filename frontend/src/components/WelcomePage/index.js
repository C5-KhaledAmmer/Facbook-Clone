import React,{useState} from "react"
import { Login } from "../Login"
import { Register } from "../Register"


export const WelcomePage = ()=>{
const [isSignUp ,setIsSignUp] = useState(true)
    return ( 
    <div>
        {/* <Login setIsSignUp={setIsSignUp}/> */}
    {isSignUp ?  <Register setIsSignUp={setIsSignUp}/>:<></>}   

    </div>
    )

}