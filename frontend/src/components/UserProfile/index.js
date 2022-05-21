import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserController } from "../../controllers/user";
import { PostsArea } from "../Homepage/PostsArea";
import { Navbar } from "../Navbar";
import "./style.css"



export const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    (async () => {
      setUser(await UserController.getUserById({ id: userId }));
      
    })();
  }, []);
  console.log(user);
  const buildProfileImages = () => {
    return (
      <div id = "cover-profile-img">
        <div id="cover-img">
          <img src="https://img.freepik.com/free-vector/luxury-logo-design-collection-branding-coporate-identity_25819-722.jpg" />
        </div>
        <div id="profile-img">
          <div id="img-inner-div"><img  src={user.profilePicture} /></div>
          
          <h1  src={user.profilePicture}>{user.userName}</h1>

        </div>
      </div>
    );
  };
  return (
    <div>
      <Navbar />
      {buildProfileImages()}
      <div style={{width:"100vw",display:"flex",justifyContent:"center"}}><PostsArea/></div>
      
    </div>
  );
};
