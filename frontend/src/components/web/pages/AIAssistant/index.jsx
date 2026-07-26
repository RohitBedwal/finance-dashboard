import React from "react";
import Main from "../../../templates/main";
import NLInput from "../../organisms/NLInput";
import AIChat from "../../organisms/AIChat";
import * as S from "./styles";
import { useData } from "../../../../context/DataContext";

const AIAssistant = () => {
  const { refetchAll } = useData();
  return (
    <Main>
      <S.InputWrapper>
        <NLInput />
      </S.InputWrapper>

      <AIChat fullHeight onAction={refetchAll} />
    </Main>
  );
};

export default AIAssistant;
