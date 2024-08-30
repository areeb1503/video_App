
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import LeftNavMenuItem from "./LeftNavMenuItem";
import { categories } from "../utils/Constants";
import { Context } from "../context/contextApi";

function LeftNav({ selectCategory, setSelectCategory }) {
  const { mobileMenu, selectCategories, setSelectCategories } = useContext(Context);
  const navigate = useNavigate();

  const clickHandler = (name, type) => {
    switch (type) {
      case "category":
      case "home":
        setSelectCategories(name);
        navigate("/");
        break;
      case "menu":
        // Handle menu logic if necessary
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black fixed md:relative z-10 transform transition-transform duration-300 ${
        mobileMenu ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 no-scrollbar`}
    >
      <div className="flex flex-col px-5">
        {categories.map((item) => (
          <React.Fragment key={item.name}>
            <LeftNavMenuItem
              text={item.type === "home" ? "Home" : item.name}
              icon={item.icon}
              action={() => clickHandler(item.name, item.type)}
              className={`${
                selectCategories === item.name ? "bg-white/[0.15]" : ""
              }`}
            />
            {item.divider && <hr className="my-5 border-white/[0.2]" />}
          </React.Fragment>
        ))}
        <hr className="my-5 border-white/[0.2]" />
        <div className="text-white/[0.5] text-[12px]">Clone by: Areeb</div>
      </div>
    </div>
  );
}

export default LeftNav;
