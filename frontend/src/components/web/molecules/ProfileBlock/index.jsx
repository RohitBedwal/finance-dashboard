import React, { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import Avatar from "../../atoms/avatar";

const ProfileBlock = ({
  name,
  email,
  avatar,
  profiles = [],
  activeProfileId,
  onProfileChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

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
      <Avatar src={avatar} alt={name} />
      <S.Info>
        <S.Name>{name}</S.Name>
        <S.Email>{email}</S.Email>
      </S.Info>
      <S.Chevron>{isOpen ? "▴" : "▾"}</S.Chevron>
      </S.Container>

      {isOpen ? (
        <S.Dropdown>
          {profiles.map((profile) => (
            <S.Option
              key={profile.id}
              type="button"
              $isActive={profile.id === activeProfileId}
              onClick={() => handleSelect(profile.id)}
            >
              <Avatar src={profile.avatar} alt={profile.name} />
              <S.OptionInfo>
                <S.Name>{profile.name}</S.Name>
                <S.Email>{profile.email}</S.Email>
              </S.OptionInfo>
            </S.Option>
          ))}
        </S.Dropdown>
      ) : null}
    </S.Wrapper>
  );
};

export default ProfileBlock;