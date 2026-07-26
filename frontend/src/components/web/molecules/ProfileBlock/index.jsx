import React, { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import Avatar from "../../atoms/avatar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import supabase from "../../../../lib/supabase";

const ProfileBlock = ({
  name,
  email,
  avatar,
  
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

const handleLogout = async () => {
  await supabase.auth.signOut();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("ai-chat-messages");

  toast.success("Logged out successfully");

  window.location.href = "/login";
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
      <S.LogoutIcon>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      </S.LogoutIcon>

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