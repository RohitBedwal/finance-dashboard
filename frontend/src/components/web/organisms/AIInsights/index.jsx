import React, { useState, useEffect } from "react";
import { getInsights } from "../../../../api/aiApi";
import * as S from "./styles";

const ICONS = {
  savings_opportunity: (
    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
  ),
  spending_pattern: (
    <svg viewBox="0 0 24 24"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/></svg>
  ),
  budget_warning: (
    <svg viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
  ),
  positive_trend: (
    <svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
  ),
  balance_tip: (
    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
  ),
};

const AIInsights = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getInsights();
      setData(res.data);
    } catch {
      setError("Could not load insights");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const formatAmount = (amt) => {
    if (!amt) return null;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>
          <svg viewBox="0 0 24 24" fill="var(--primary-600)">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          AI Insights
        </S.Title>

        <S.RefreshButton onClick={fetchInsights} disabled={loading}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
          </svg>
          {loading ? "Loading..." : "Refresh"}
        </S.RefreshButton>
      </S.Header>

      {data?.summary && <S.Summary>{data.summary}</S.Summary>}

      {loading && !data && (
        <S.EmptyState>Analyzing your finances...</S.EmptyState>
      )}

      {error && <S.EmptyState>{error}</S.EmptyState>}

      {!loading && data?.insights?.length === 0 && (
        <S.EmptyState>Add more transactions to get AI insights.</S.EmptyState>
      )}

      {data?.insights?.length > 0 && (
        <S.CardGrid>
          {data.insights.map((insight, index) => (
            <S.InsightCard key={index}>
              <S.InsightHeader>
                <S.InsightIcon $type={insight.type}>
                  {ICONS[insight.type] || ICONS.spending_pattern}
                </S.InsightIcon>
                <S.PriorityBadge $priority={insight.priority}>
                  {insight.priority}
                </S.PriorityBadge>
              </S.InsightHeader>

              <S.InsightTitle>{insight.title}</S.InsightTitle>
              <S.InsightDesc>{insight.description}</S.InsightDesc>

              {insight.amount && (
                <S.InsightAmount>
                  Save {formatAmount(insight.amount)}/month
                </S.InsightAmount>
              )}
            </S.InsightCard>
          ))}
        </S.CardGrid>
      )}
    </S.Container>
  );
};

export default AIInsights;
