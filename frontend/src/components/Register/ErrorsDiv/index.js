import "./style.css"
export const ErrorsDiv = ({errors})=>{

    return errors.length !== 0?(
        <div id="register-response-div">
            
           <ul>
               {errors.map(error =>{
                  return  <li key={error}>{error}</li>
               })}
           </ul>
      </div>
    ):<></>
}