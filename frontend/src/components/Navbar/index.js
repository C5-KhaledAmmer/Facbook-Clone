import { Img } from "../../controllers/info";
import { NavbarButtons } from "./NavbarButtons";
import "./style.css";
export const Navbar = () => {
  return (
    <div id="nav-bar">
      <img src={Img.imagesUrl.facebook} />
      <div id ="search-div">
        <button>
          <img src={Img.imagesUrl.searchIcon} />
        </button>
        <input placeholder="Search for a friend"/>
      </div>
      <NavbarButtons/>
     
    </div>
  );
};
