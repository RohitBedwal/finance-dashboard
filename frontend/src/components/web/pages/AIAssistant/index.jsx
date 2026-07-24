import React, { useState, useCallback } from "react";
import Main from "../../../templates/main";
import NLInput from "../../organisms/NLInput";
import AIInsights from "../../organisms/AIInsights";
import AIChat from "../../organisms/AIChat";
import * as S from "./styles";

const AIAssistant = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTransactionAdded = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  return (
    <Main>
      <NLInput onTransactionAdded={handleTransactionAdded} />

      <S.Layout>
        <S.Left>
          <AIInsights key={refreshKey} />
        </S.Left>

        <S.Right>
          <AIChat fullHeight />
        </S.Right>
      </S.Layout>
    </Main>
  );
};

export default AIAssistant;
