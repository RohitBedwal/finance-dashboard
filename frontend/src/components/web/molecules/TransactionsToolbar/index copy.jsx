// import React, { useState } from "react";
// import * as S from "./styles";
// import Button from "../../atoms/buttons";
// import { exportToCSV } from "../../../../utils/exportCSV";
// import AddNewTransaction from "../../pages/Transactions/AddNewTransaction";
// import DatePicker from "react-datepicker";
// // import { useTransactionFilters } from "../../../../context/TransactionFilterContext";
// // import { useTransactionFilters } from "../../../../context/TransactionFilterContext";

// import "react-datepicker/dist/react-datepicker.css";// import { exportToCSV } from "../../../utils/exportCSV";
// import TransactionFiltersBar from "../TransactionFiltersBar";
// import { useTransactionFilters } from "../../../../context/TransactionFilterContext.jsx";

// const TransactionsToolbar = ({ transactions, onDateFilter }) => {
//     const [openModal, setOpenModal] = useState(false);
//     const [dateRange, setDateRange] = useState([null, null]);
//     const [startDate, endDate] = dateRange;
//     const { filtersOpen, setFiltersOpen } = useTransactionFilters();

//     return (
//         <S.Container>
//             <S.Left>
//                 <S.DateRange>
//                     <DatePicker
//                         selectsRange
//                         startDate={startDate}
//                         endDate={endDate}
//                         maxDate={new Date()}
//                         onChange={(update) => {
//                             setDateRange(update);

//                             if (update[0] && update[1]) {
//                                 onDateFilter(update[0], update[1]);
//                             }
//                         }}
//                         placeholderText="Select date range"
//                         dateFormat="dd MMM yyyy"
//                     />
//                 </S.DateRange>

//                 <S.IconButton>
//                     <svg >
//                         <use href="/icons.svg#filters" />
//                     </svg>
//                 </S.IconButton>
               
//             </S.Left>

//             <S.Right>
//                 <Button
//                     size="sm"
//                     variant="secondary"
//                     onClick={() => exportToCSV(transactions)}
//                 >
//                     Export CSV
//                 </Button>

//                 <Button
//                     variant="primary"
//                     size="sm"
//                     onClick={() => setOpenModal(true)}

//                 >
//                     + Add new
//                 </Button>
//             </S.Right>
//             {openModal && (
//                 <AddNewTransaction
//                     onClose={() => setOpenModal(false)}
//                 />
//             )}
            
//         </S.Container>
//     );
// };

// export default TransactionsToolbar;