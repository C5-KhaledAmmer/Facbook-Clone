import { useEffect, useState ,useParams} from "react"
import { UserController } from "../../controllers/user";


export const SearchResult = ()=>{
    const [resultsResults,setSearchResults] = useState([]);
    const {userName}= useParams();
    useEffect(()=>{
        (async()=>{
            await UserController.getUserByUserName({
                name:userName.toLowerCase().replaceAll(" ","")
            })
        }

        )()
    },[])
    return (
        <div id = "search-page">
            <div id ="inner-search-page">

            </div>
        </div>
    )
}