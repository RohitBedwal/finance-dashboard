import React, { useEffect, useState } from "react";
import { useData } from "../../../../context/DataContext";
import CardSetupModal from "../CardSetupModal";

const CardPrompt = () => {
  const { cards, loading, refetchCards } = useData();
  const [open, setOpen] = useState(false);
  const [canPrompt, setCanPrompt] = useState(() => {
    try {
      return (
        !!localStorage.getItem("user") &&
        !localStorage.getItem("card_prompt_dismissed") &&
        !!localStorage.getItem("onboarding_seen")
      );
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const onOnboardingClosed = () => {
      if (!localStorage.getItem("card_prompt_dismissed")) setCanPrompt(true);
    };
    window.addEventListener("onboarding:closed", onOnboardingClosed);
    return () => window.removeEventListener("onboarding:closed", onOnboardingClosed);
  }, []);

  useEffect(() => {
    if (!canPrompt) return;
    if (loading) return;
    if (cards.length > 0) return;

    const timer = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(timer);
  }, [canPrompt, loading, cards.length]);

  if (!open) return null;

  const handleClose = () => {
    localStorage.setItem("card_prompt_dismissed", "1");
    setOpen(false);
  };

  return (
    <CardSetupModal
      open={open}
      onClose={handleClose}
      onSaved={() => {
        localStorage.removeItem("card_prompt_dismissed");
        refetchCards();
      }}
      showSkip
    />
  );
};

export default CardPrompt;
