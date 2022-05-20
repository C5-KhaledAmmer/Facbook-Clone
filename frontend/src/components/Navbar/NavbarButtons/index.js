import { Img, Info, LocalStorage } from "../../../controllers/info";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useState } from "react";
export const NavbarButtons = () => {
  const navigate = useNavigate();
  const [isMenuShown, setIsMenuShown] = useState(false);
  const logOut = async()=>{
    await LocalStorage.removeItem({key:"user"})
    navigate("../")
  }
  const list = [{name:"Log Out",onClick:logOut},{name:"Setting",onClick:()=>{}}]
  const createButton = ({ icon, onClick }) => {
    return (
      <div>
        <button onClick={onClick}>
          <img src={icon} />
        </button>
      </div>
    );
  };
  
  const showMessages = () => {};
  const showNotifications = () => {};
  const showMenu = () => {
    return (
      <div id="navbar-menu-div">
        <ul>
          {list.map((item) => {
            return (
              <button onClick={item.onClick}>{item.name}</button>
            )
          })}
        </ul>
        
      </div>
    );
  };
  return (
    <div id="navbar-buttons-div">
      {createButton({
        icon: Img.imagesUrl.home,
        onClick: () => {
          navigate(`/homepage/${Info.user.userId}`);
        },
      })}
      {createButton({ icon: Img.imagesUrl.messenger, onClick: showMessages })}
      {createButton({ icon: Img.imagesUrl.bell, onClick: showNotifications })}
      <div style={{position:"relative"}}>
        {createButton({ icon: Img.imagesUrl.menu, onClick: ()=>{setIsMenuShown(!isMenuShown)} })}
        {isMenuShown?showMenu():<></>}
        </div>
    </div>
  );
};
