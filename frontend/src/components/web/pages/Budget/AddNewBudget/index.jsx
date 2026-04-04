import React from "react";
import Select from "../../../atoms/select";
import Button from "../../../atoms/buttons";
import { categoryOptionsByType } from "../../Transactions/AddNewTransaction/defaultCategories";
import { useBudgetForm } from "./useBudgetForm";
import * as S from "./styles";

const AddNewBudget = ({ onClose, initialBudget = null }) => {
  const { form, handleChange, saveBudget } = useBudgetForm(initialBudget);

  const handleSubmit = () => {
    const success = saveBudget();
    if (success) onClose();
  };

  const expenseCategories = categoryOptionsByType.Expense || [];
  const selectedCategory = form.category
    ? { value: form.category, label: form.category }
    : null;
  const isEditMode = Boolean(initialBudget?.id);

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(event) => event.stopPropagation()}>
        <S.CloseButton onClick={onClose}>✕</S.CloseButton>

        <S.Header>
          <S.Title>{isEditMode ? "Edit budget" : "Add new budget"}</S.Title>
          <p>Select a category and set budget amount</p>
        </S.Header>

        <S.Field>
          <label>Category</label>
          <Select
            options={expenseCategories.map((category) => ({
              value: category,
              label: category,
            }))}
            value={selectedCategory?.value || ""}
            onChange={(event) => handleChange("category", event.target.value)}
          />
        </S.Field>

        <S.Field>
          <label>Budget amount</label>
          <S.Input
            placeholder="₹10,000"
            value={form.amount}
            onChange={(event) => handleChange("amount", event.target.value)}
          />
        </S.Field>

        <S.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isEditMode ? "Update" : "Save"}
          </Button>
        </S.Footer>
      </S.Modal>
    </S.Overlay>
  );
};

export default AddNewBudget;
