import React from "react";
import { Avatar, Menu } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { replace } from "lodash";

const ProfileMenu = ({ user, logout }) => {
  const navigate = useNavigate()
  return (
    <Menu shadow="md" width={200} withinPortal={false}>
      <Menu.Target>
        <Avatar src={user?.picture} alt="user image" radius="xl" size={"30px"} />
      </Menu.Target>
      <Menu.Dropdown style={{ display: "flex", flexDirection: "column" }}>
        <Menu.Item onClick={()=>navigate("./favourites" , {replace:true})}>
          Favourites
          </Menu.Item>
        <Menu.Item onClick={()=>navigate("./bookings" , {replace:true})}>
          Bookings
          </Menu.Item>
        <Menu.Item
          onClick={() => {
            localStorage.clear();
            logout();
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
