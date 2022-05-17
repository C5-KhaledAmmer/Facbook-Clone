
export const AlertDialog = ({text,color,bgColor})=>{

    return (
        <div style={{backgroundColor : `${bgColor}`}}>
            <h2 style={{color:`${color}`}}>{text}</h2>
        </div>
    )
}