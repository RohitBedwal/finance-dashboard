import React, { useState } from "react";
import toast from "react-hot-toast";
import { deleteCard } from "../../../../api/cardApi";
import { useData } from "../../../../context/DataContext";
import * as S from "./styles";

const GRADIENTS = [
  "linear-gradient(135deg, #8470ff 0%, #5347a1 100%)",
  "linear-gradient(135deg, #16213e 0%, #0f3460 100%)",
  "linear-gradient(135deg, #a498ff 0%, #6657c6 100%)",
  "linear-gradient(135deg, #f9970c 0%, #d97706 100%)",
  "linear-gradient(135deg, #0f766e 0%, #115e59 100%)",
];

const CardsSection = ({ selectedCardId, onSelectCard, onAddCard }) => {
  const { cards, refetchCards } = useData();
  const [deleting, setDeleting] = useState(false);
  const [switchOpen, setSwitchOpen] = useState(false);

  const handleDelete = async (card) => {
    if (!window.confirm(`Remove "${card.name}"?`)) return;
    setDeleting(true);
    try {
      await deleteCard(card.id);
      toast.success("Card removed");
      await refetchCards();
    } catch {
      toast.error("Failed to remove card");
    } finally {
      setDeleting(false);
    }
  };

  const handleSelect = (id) => {
    if (typeof onSelectCard === "function") onSelectCard(id);
    setSwitchOpen(false);
  };

  const renderCard = (card, index, { showSwitch = false } = {}) => (
    <S.Card
      key={card.id}
      $gradient={GRADIENTS[index % GRADIENTS.length]}
      $selected={card.id === selectedCardId}
      onClick={() => handleSelect(card.id)}
    >
      <S.CardTop>
        {showSwitch ? (
          <S.NameTrigger
            onClick={(e) => {
              e.stopPropagation();
              setSwitchOpen((o) => !o);
            }}
          >
            <S.BankName>{card.bank_name}</S.BankName>
            <S.SwitchButton $open={switchOpen}>
              <svg viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </S.SwitchButton>
          </S.NameTrigger>
        ) : (
          <S.BankName>{card.bank_name}</S.BankName>
        )}
        <S.DeleteButton
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(card);
          }}
          disabled={deleting}
          aria-label={`Remove ${card.name}`}
        >
          <svg viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </S.DeleteButton>
      </S.CardTop>

      <S.ChipIcon>
        <svg viewBox="0 0 24 24">
          <rect x="1" y="6" width="8" height="12" rx="1.5" />
          <path d="M2 10h6M2 13h6" />
        </svg>
      </S.ChipIcon>

      <S.Number>••••  ••••  ••••  {card.last4}</S.Number>

      <S.CardBottom>
        <S.CardName>{card.name}</S.CardName>
        <S.BankAbbr>{card.bank_name.slice(0, 1)}</S.BankAbbr>
      </S.CardBottom>
    </S.Card>
  );

  const selectedIndex = cards.findIndex((c) => c.id === selectedCardId);

  return (
    <S.Section>
      <S.Header>
        <S.Title>Your cards</S.Title>
      </S.Header>

      <S.MobileOnly>
        {cards.length === 0 ? (
          <S.Empty>
            <S.EmptyText>No cards yet. Add your first card to track it.</S.EmptyText>
            <S.EmptyButton onClick={() => onAddCard?.()}>+ Add card</S.EmptyButton>
          </S.Empty>
        ) : (
          <S.MobileCardWrap>
            {selectedIndex >= 0
              ? renderCard(cards[selectedIndex], selectedIndex, { showSwitch: true })
              : null}

            {switchOpen && (
              <S.SwitchMenu $gradient={GRADIENTS[selectedIndex % GRADIENTS.length]}>
                {cards.map((card) => (
                  <S.SwitchItem
                    key={card.id}
                    $active={card.id === selectedCardId}
                    onClick={() => handleSelect(card.id)}
                  >
                    <span>{card.bank_name}</span>
                    <span>•••• {card.last4}</span>
                  </S.SwitchItem>
                ))}
              </S.SwitchMenu>
            )}
          </S.MobileCardWrap>
        )}
      </S.MobileOnly>

      <S.DesktopOnly>
        <S.Scroll>
          {cards.length === 0 ? (
            <S.Empty>
              <S.EmptyText>No cards yet. Add your first card to track it.</S.EmptyText>
              <S.EmptyButton onClick={() => onAddCard?.()}>+ Add card</S.EmptyButton>
            </S.Empty>
          ) : (
            <S.Row>
              {cards.map(renderCard)}

              <S.AddTile onClick={() => onAddCard?.()}>
                <S.AddIcon>+</S.AddIcon>
                <S.AddText>Add card</S.AddText>
              </S.AddTile>
            </S.Row>
          )}
        </S.Scroll>
      </S.DesktopOnly>
    </S.Section>
  );
};

export default CardsSection;
