import React from "react";
import * as S from "./styles";

const Avatar = ({ src, alt }) => {
  return <S.Image src={src} alt={alt} />;
};

export default Avatar;