import React, { useState } from "react";
import { parseTransaction } from "../../../../api/aiApi";
import { createTransaction } from "../../../../api/transactionApi";
import toast from "react-hot-toast";
import * as S from "./styles";

const NLInput = ({ onTransactionAdded }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleSubmit = async () => {
    if (!text.trim() || loading) return;

    setLoading(true);
    try {
      const res = await parseTransaction(text.trim());
      setPreview(res.data);
    } catch {
      toast.error("Could not parse that. Try rephrasing.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!preview) return;

    try {
      await createTransaction(preview);
      toast.success("Transaction added!");
      setText("");
      setPreview(null);
      onTransactionAdded?.();
    } catch {
      toast.error("Failed to save transaction");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (preview) {
        handleConfirm();
      } else {
        handleSubmit();
      }
    }
  };

  const formatAmount = (amt) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amt);

  return (
    <div>
      <S.Container>
        <S.SparkIcon>
          <svg viewBox="0 0 24 24">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </S.SparkIcon>

        <S.Input
          placeholder="Type a transaction... e.g. 'spent 450 on uber yesterday'"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />

        {loading ? (
          <S.LoadingText>Parsing...</S.LoadingText>
        ) : (
          <S.SubmitButton onClick={handleSubmit} disabled={!text.trim()}>
            Parse
          </S.SubmitButton>
        )}
      </S.Container>

      {preview && (
        <S.Preview>
          <S.PreviewRow>
            <span>Type</span>
            <strong>{preview.type}</strong>
          </S.PreviewRow>
          <S.PreviewRow>
            <span>Amount</span>
            <strong>{formatAmount(preview.amount)}</strong>
          </S.PreviewRow>
          <S.PreviewRow>
            <span>Category</span>
            <strong>{preview.category}</strong>
          </S.PreviewRow>
          <S.PreviewRow>
            <span>Name</span>
            <strong>{preview.name || "-"}</strong>
          </S.PreviewRow>
          {preview.method && (
            <S.PreviewRow>
              <span>Method</span>
              <strong>{preview.method}</strong>
            </S.PreviewRow>
          )}
          <S.PreviewRow>
            <span>Date</span>
            <strong>{preview.date}</strong>
          </S.PreviewRow>

          <S.PreviewActions>
            <S.CancelButton onClick={() => setPreview(null)}>
              Cancel
            </S.CancelButton>
            <S.ConfirmButton onClick={handleConfirm}>
              Confirm & Save
            </S.ConfirmButton>
          </S.PreviewActions>
        </S.Preview>
      )}
    </div>
  );
};

export default NLInput;
