import React from "react";
import Main from "../../../templates/main";
import NLInput from "../../organisms/NLInput";
import AIChat from "../../organisms/AIChat";
import * as S from "./styles";

const AIAssistant = () => {
  return (
    <Main>
      <S.InputWrapper>
        <NLInput />
      </S.InputWrapper>

      <AIChat fullHeight onAction={() => window.location.reload()} />
    </Main>
  );
};

export default AIAssistant;
