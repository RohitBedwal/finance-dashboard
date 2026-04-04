import React, { useState } from "react";
import * as S from "./styles";
import Button from "../../atoms/buttons";
import { exportToCSV } from "../../../../utils/exportCSV";
import AddNewTransaction from "../../pages/Transactions/AddNewTransaction";
import DatePicker from "react-datepicker";
// import { useTransactionFilters } from "../../../../context/TransactionFilterContext";
// import { useTransactionFilters } from "../../../../context/TransactionFilterContext";

import "react-datepicker/dist/react-datepicker.css";// import { exportToCSV } from "../../../utils/exportCSV";
import TransactionFiltersBar from "../TransactionFiltersBar";
import { useTransactionFilters } from "../../../../context/TransactionFilterContext.jsx";

const TransactionsToolbar = ({
    transactions,
    onDateFilter,
    showExportCsv = true,
    addButtonLabel = "+ Add new",
    onAddClick,
    filterBarProps = {},
}) => {
    const [openModal, setOpenModal] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);

    const [startDate, endDate] = dateRange;

    const { filtersOpen, setFiltersOpen } = useTransactionFilters();

    const handleAddClick = () => {
        if (typeof onAddClick === "function") {
            onAddClick();
            return;
        }

        setOpenModal(true);
    };

    return (
        <>
            <S.Container>
                <S.Left>

                    <S.DateRange>
                        <DatePicker
                            selectsRange
                            startDate={startDate}
                            endDate={endDate}
                            maxDate={new Date()}
                            onChange={(update) => {
                                setDateRange(update);
                                onDateFilter(update[0], update[1]);
                            }}
                            placeholderText="Select date range"
                            dateFormat="dd MMM yyyy"
                        />
                    </S.DateRange>

                    <S.IconButton
                        onClick={() => setFiltersOpen(!filtersOpen)}
                    >
                        <svg>
                            <use href="/icons.svg#filters" />
                        </svg>
                    </S.IconButton>

                </S.Left>

                <S.Right>
                    {showExportCsv && (
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => exportToCSV(transactions)}
                        >
                            Export CSV
                        </Button>
                    )}

                    <Button
                        variant="primary"
                        size="sm"
                        onClick={handleAddClick}
                    >
                        {addButtonLabel}
                    </Button>

                </S.Right>

                {openModal && (
                    <AddNewTransaction
                        onClose={() => setOpenModal(false)}
                    />
                )}

            </S.Container>

            {filtersOpen && <TransactionFiltersBar {...filterBarProps} />}
        </>
    );
};
export default TransactionsToolbar;