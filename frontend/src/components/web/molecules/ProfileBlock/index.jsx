import React from "react";
import * as S from "./styles";
import Avatar from "../../atoms/avatar";

const ProfileBlock = ({ name, email, avatar }) => {
  return (
    <S.Container>

      <Avatar src={avatar} alt={name} />
      <S.Info>
        <S.Name>{name}</S.Name>
        <S.Email>{email}</S.Email>
      </S.Info>
    </S.Container>
  );
};

export default ProfileBlock;