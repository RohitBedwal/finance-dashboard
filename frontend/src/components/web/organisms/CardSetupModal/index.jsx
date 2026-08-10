import React, { useState } from "react";
import toast from "react-hot-toast";
import { addCard } from "../../../../api/cardApi";
import * as S from "./styles";

const CardSetupModal = ({ open, onClose, onSaved, showSkip = true }) => {
  const [form, setForm] = useState({ name: "", last4: "", bank_name: "" });
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    let next = value;
    if (name === "last4") next = value.replace(/\D/g, "").slice(0, 4);
    setForm((prev) => ({ ...prev, [name]: next }));
  };

  const reset = () => setForm({ name: "", last4: "", bank_name: "" });

  const handleClose = () => {
    reset();
    onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Card name is required");
    if (!/^[0-9]{4}$/.test(form.last4)) return toast.error("Enter the last 4 digits of the card");
    if (!form.bank_name.trim()) return toast.error("Bank name is required");

    setSaving(true);
    try {
      await addCard({
        name: form.name.trim(),
        last4: form.last4,
        bank_name: form.bank_name.trim(),
      });
      toast.success("Card added");
      onSaved?.();
      reset();
      onClose?.();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add card");
    } finally {
      setSaving(false);
    }
  };

  return (
    <S.Overlay onClick={handleClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.Title>Add a card</S.Title>
          <S.CloseButton onClick={handleClose} aria-label="Close">
            <svg viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </S.CloseButton>
        </S.Header>

        <S.Subtitle>
          Track your payment cards. Only the last 4 digits are stored — never your full card number.
        </S.Subtitle>

        <S.Form onSubmit={handleSubmit}>
          <S.Field>
            <S.Label htmlFor="card-name">Card name</S.Label>
            <S.Input
              id="card-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. HDFC Credit Card"
            />
          </S.Field>

          <S.Field>
            <S.Label htmlFor="card-last4">Last 4 digits</S.Label>
            <S.Input
              id="card-last4"
              name="last4"
              value={form.last4}
              onChange={handleChange}
              placeholder="e.g. 1234"
              inputMode="numeric"
              maxLength={4}
            />
          </S.Field>

          <S.Field>
            <S.Label htmlFor="card-bank">Bank name</S.Label>
            <S.Input
              id="card-bank"
              name="bank_name"
              value={form.bank_name}
              onChange={handleChange}
              placeholder="e.g. HDFC Bank"
            />
          </S.Field>

          <S.Actions>
            {showSkip && (
              <S.SkipButton type="button" onClick={handleClose}>
                Skip
              </S.SkipButton>
            )}
            <S.SaveButton type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save card"}
            </S.SaveButton>
          </S.Actions>
        </S.Form>
      </S.Modal>
    </S.Overlay>
  );
};

export default CardSetupModal;
