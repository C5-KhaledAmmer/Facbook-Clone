import { Img, Info } from "../../../controllers/info";
import { useNavigate } from "react-router-dom";
import "./style.css";
export const NavbarButtons = () => {
  const navigate = useNavigate();
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
  const showMenu = () => {};
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
      {createButton({ icon: Img.imagesUrl.menu, onClick: showMenu })}
    </div>
  );
};
