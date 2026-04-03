import React, { useState } from "react";
import Select from "react-select";
import * as S from "./styles";
import { defaultCategories } from "./defaultCategories";
import { useTransactionForm } from "./useTransactionForm";
import Button from "../../../atoms/buttons";

const dropdownStyles = {
    control: (base) => ({
        ...base,
        borderRadius: "999px",
        padding: "6px",
        borderColor: "var(--gray-200)",
        boxShadow: "none",
    }),
};


const AddNewTransaction = ({ onClose }) => {
    const { form, handleChange, saveTransaction } =
        useTransactionForm();

    const [categories, setCategories] =
        useState(defaultCategories);

    const handleSubmit = () => {
        const success = saveTransaction();
        if (success) onClose();
    };

    return (
        <S.Overlay onClick={onClose}>
            <S.Modal onClick={(e) => e.stopPropagation()}>
                <S.CloseButton onClick={onClose}>
                    ✕
                </S.CloseButton>


                <S.Header>
                    <S.Title>Adding a new transaction</S.Title>
                    <p>Please fill in the form below</p>
                </S.Header>

                <S.Grid>
                    {/* TYPE */}
                    <S.Field>
                        <label>Type</label>
                        <Select
                            required
                            styles={dropdownStyles}
                            options={[
                                { value: "Income", label: "Income" },
                                { value: "Expense", label: "Expense" },
                            ]}
                            onChange={(e) =>
                                handleChange("type", e.value)
                            }
                        />
                    </S.Field>

                    {/* CURRENCY */}
                    {/* <S.Field>
            <label>Currency</label>
            <Select
              styles={dropdownStyles}
              options={[
                { value: "USD", label: "USD" },
                { value: "INR", label: "INR" },
              ]}
              onChange={(e) =>
                handleChange("currency", e.value)
              }
            />
          </S.Field> */}

                    {/* AMOUNT */}
                    <S.Field>
                        <label>Amount</label>
                        <S.Input
                            required
                            placeholder="₹10,500.00"
                            onChange={(e) =>
                                handleChange("amount", e.target.value)
                            }
                        />
                    </S.Field>

                    {/* NAME */}
                    <S.FullRow>
                        <S.Field>
                            <label>Name</label>
                            <S.Input
                                required
                                placeholder="Name of transaction or short description"
                                onChange={(e) =>
                                    handleChange("name", e.target.value)
                                }
                            />
                        </S.Field>
                    </S.FullRow>

                    {/* METHOD */}
                    <S.Field>
                        <label>Method</label>
                        <Select
                            required
                            styles={dropdownStyles}
                            options={[
                                { value: "Card", label: "Card" },
                                { value: "UPI", label: "UPI" },
                                { value: "Cash", label: "Cash" },
                            ]}
                            onChange={(e) =>
                                handleChange("method", e.value)
                            }
                        />
                    </S.Field>

                    {/* CATEGORY */}
                    <S.Field>
                        <label>Category</label>

                        <Select
                            required
                            styles={dropdownStyles}
                            options={categories.map((c) => ({
                                label: c,
                                value: c,
                            }))}
                            onChange={(e) =>
                                handleChange("category", e.value)
                            }
                        />

                    </S.Field>

                    {/* DATE */}
                    <S.Field>
                        <label>Date</label>

                        <S.DateWrapper>
                            {/* <S.CalendarIcon>
                <svg width="16" height="16">
                  <use href="/icons.svg#calendar" />
                </svg>
              </S.CalendarIcon> */}

                            <S.Input
  required
  type="date"
  value={form.date}
  max={new Date().toISOString().split("T")[0]}
  onChange={(e) =>
    handleChange("date", e.target.value)
  }
/>
                        </S.DateWrapper>
                    </S.Field>

                    {/* STATUS */}
                    <S.Field>
                        <label>Status</label>
                        <Select
                            styles={dropdownStyles}
                            options={[
                                { value: "Successful", label: "Successful" },
                                { value: "Pending", label: "Pending" },
                                { value: "Failed", label: "Failed" },
                            ]}
                            onChange={(e) =>
                                handleChange("status", e.value)
                            }
                        />
                    </S.Field>
                </S.Grid>

                <S.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </S.Footer>
            </S.Modal>
        </S.Overlay>
    );
};

export default AddNewTransaction;