import React, { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import Avatar from "../../atoms/avatar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProfileBlock = ({
  name,
  email,
  avatar,
  
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  toast.success("Logged out successfully");

  navigate("/login");
};

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelect = (profileId) => {
    setIsOpen(false);
    if (profileId !== activeProfileId) {
      onProfileChange?.(profileId);
    }
  };

  return (
    <S.Wrapper ref={containerRef}>
      <S.Container type="button" onClick={() => setIsOpen((value) => !value)}>
      <Avatar src="https://cdn-icons-png.flaticon.com/512/616/616410.png" alt={name} />
      <S.Info>
        <S.Name>{name}</S.Name>
        <S.Email>{email}</S.Email>
      </S.Info>
      <S.Chevron>{isOpen ? "▴" : "▾"}</S.Chevron>
      </S.Container>

      {isOpen ? (
  <S.Dropdown>
    <S.Option
      type="button"
      onClick={handleLogout}
    >
      <Avatar
        src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png"
        alt="Logout"
      />

      <S.OptionInfo>
        <S.Name>Logout</S.Name>
        <S.Email>Sign out of your account</S.Email>
      </S.OptionInfo>
    </S.Option>
  </S.Dropdown>
) : null}
    </S.Wrapper>
  );
};

export default ProfileBlock;