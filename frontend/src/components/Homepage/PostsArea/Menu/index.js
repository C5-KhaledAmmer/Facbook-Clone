import "./style.css";
export const Menu = ({ list }) => {
  return (
    <div id="menu-div">
      <ul>
        {list.map((item) => {
          return <strong key={item}>{item}</strong>;
        })}
      </ul>
    </div>
  );
};
