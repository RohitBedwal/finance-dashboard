import PDFDocument from "pdfkit";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 42;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const PURPLE = "#8470ff";
const PURPLE_DARK = "#5347a1";
const TEXT = "#1c1c22";
const MUTED = "#82828c";
const LIGHT = "#f7f6ff";
const BORDER = "#eceaff";
const SUCCESS = "#297b32";
const DANGER = "#e83838";
const WHITE = "#ffffff";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const formatINR = (n) =>
  `Rs. ${Number(n || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatDate = (d) =>
  `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;

const parseDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

export async function buildStatementPdf({ profile = {}, transactions = [], start = null, end = null }) {
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
  });

  const chunks = [];
  doc.on("data", (c) => chunks.push(c));
  const done = new Promise((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });

  const parsedStart = start ? parseDate(start) : null;
  const parsedEnd = end ? parseDate(end) : null;
  const endOfEnd = parsedEnd ? new Date(parsedEnd) : null;
  if (endOfEnd) endOfEnd.setHours(23, 59, 59, 999);

  const periodLabel = parsedStart && parsedEnd && parsedStart.toDateString() === parsedEnd.toDateString()
    ? formatDate(parsedStart)
    : parsedStart && parsedEnd
      ? `${formatDate(parsedStart)}  to  ${formatDate(parsedEnd)}`
      : parsedStart
        ? `From ${formatDate(parsedStart)}`
        : parsedEnd
          ? `Up to ${formatDate(parsedEnd)}`
          : "All transactions";

  const opening = transactions.reduce((sum, t) => {
    const d = parseDate(t.date);
    if (!d || (parsedStart && d >= parsedStart)) return sum;
    const amt = Number(t.amount) || 0;
    return t.type === "Income" ? sum + amt : sum - amt;
  }, 0);

  const txList = transactions
    .map((t) => ({ ...t, parsed: parseDate(t.date) }))
    .filter((t) => {
      if (!t.parsed) return false;
      if (parsedStart && t.parsed < parsedStart) return false;
      if (endOfEnd && t.parsed > endOfEnd) return false;
      return true;
    })
    .sort((a, b) => a.parsed - b.parsed);

  const credits = txList.filter((t) => t.type === "Income").reduce((s, t) => s + Number(t.amount || 0), 0);
  const debits = txList.filter((t) => t.type === "Expense").reduce((s, t) => s + Number(t.amount || 0), 0);
  const closing = opening + credits - debits;

  const bankName = profile.bank_name || "Finance Dashboard";
  const accountHolder = profile.account_holder_name || profile.name || "Account Holder";

  /* ---------- Header band ---------- */
  const HEADER_H = 78;
  doc.rect(0, 0, PAGE_WIDTH, HEADER_H).fill(PURPLE);

  doc.fillColor(WHITE).font("Helvetica-Bold").fontSize(17).text(bankName, MARGIN, 18, { width: 300 });
  doc.font("Helvetica").fontSize(9.5).text(accountHolder, MARGIN, 42, { width: 300 });

  doc.font("Helvetica-Bold").fontSize(13).text("ACCOUNT STATEMENT", PAGE_WIDTH - MARGIN, 20, {
    width: 240,
    align: "right",
  });
  doc.font("Helvetica").fontSize(9).text(periodLabel, PAGE_WIDTH - MARGIN, 40, { width: 240, align: "right" });

  /* ---------- Account details box ---------- */
  let y = HEADER_H + 18;

  doc.fillColor(PURPLE_DARK).font("Helvetica-Bold").fontSize(8).text("ACCOUNT DETAILS", MARGIN, y);
  y += 12;

  const detailPairs = [
    ["Account Holder", accountHolder],
    ["Account Number", profile.account_number || "—"],
    ["Account Type", profile.account_type || "—"],
    ["IFSC Code", profile.ifsc_code || "—"],
    ["Company", profile.company_name || "—"],
    ["Branch", profile.branch_address || "—"],
  ];

  const detailBox = { h: 62, colW: CONTENT_WIDTH / 2 };
  doc.roundedRect(MARGIN, y, CONTENT_WIDTH, detailBox.h, 10).stroke(BORDER);
  detailPairs.forEach(([label, value], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = MARGIN + col * detailBox.colW;
    const yy = y + 8 + row * 21;
    doc.fillColor(MUTED).font("Helvetica").fontSize(7.5).text(String(label).toUpperCase(), x + 10, yy, { width: detailBox.colW - 20 });
    doc.fillColor(TEXT).font("Helvetica-Bold").fontSize(9.5).text(value, x + 10, yy + 10, { width: detailBox.colW - 20 });
  });

  /* ---------- Summary boxes ---------- */
  y += detailBox.h + 16;
  const summary = [
    { label: "Opening Balance", value: formatINR(opening), color: TEXT },
    { label: "Credits", value: formatINR(credits), color: SUCCESS },
    { label: "Debits", value: formatINR(debits), color: DANGER },
    { label: "Remaining Balance", value: formatINR(closing), color: WHITE },
  ];

  const gap = 8;
  const boxW = (CONTENT_WIDTH - gap * 3) / 4;
  const boxH = 52;

  summary.forEach((s, i) => {
    const x = MARGIN + i * (boxW + gap);
    const highlighted = s.color === WHITE;
    if (highlighted) {
      doc.roundedRect(x, y, boxW, boxH, 10).fill(PURPLE);
    } else {
      doc.roundedRect(x, y, boxW, boxH, 10).fill(LIGHT).stroke(BORDER);
    }
    doc.fillColor(highlighted ? WHITE : MUTED).font("Helvetica").fontSize(7).text(s.label.toUpperCase(), x + 10, y + 8, { width: boxW - 20 });
    doc.fillColor(highlighted ? WHITE : TEXT).font("Helvetica-Bold").fontSize(10.5).text(s.value, x + 10, y + 22, { width: boxW - 20 });
  });

  y += boxH + 18;

  /* ---------- Transactions table ---------- */
  doc.fillColor(PURPLE_DARK).font("Helvetica-Bold").fontSize(8).text("TRANSACTIONS", MARGIN, y);
  y += 12;

  const colDate = 64;
  const colDesc = 148;
  const colDebit = 90;
  const colCredit = 90;
  const colBalance = CONTENT_WIDTH - colDate - colDesc - colDebit - colCredit;

  const drawTableHeader = (yy) => {
    doc.rect(MARGIN, yy, CONTENT_WIDTH, 20).fill(PURPLE);
    doc.fillColor(WHITE).font("Helvetica-Bold").fontSize(7.5);
    doc.text("DATE", MARGIN + 6, yy + 6, { width: colDate });
    doc.text("DESCRIPTION", MARGIN + colDate + 6, yy + 6, { width: colDesc });
    doc.text("DEBIT (Rs.)", MARGIN + colDate + colDesc + 6, yy + 6, { width: colDebit - 8, align: "right" });
    doc.text("CREDIT (Rs.)", MARGIN + colDate + colDesc + colDebit + 6, yy + 6, { width: colCredit - 8, align: "right" });
    doc.text("BALANCE (Rs.)", MARGIN + CONTENT_WIDTH - colBalance + 4, yy + 6, { width: colBalance - 8, align: "right" });
  };

  const TABLE_BOTTOM = PAGE_HEIGHT - 64;

  drawTableHeader(y);
  y += 20;

  if (txList.length === 0) {
    doc.fillColor(MUTED).font("Helvetica").fontSize(9).text("No transactions found in this period.", MARGIN, y + 10, { width: CONTENT_WIDTH, align: "center" });
  }

  let balance = opening;
  txList.forEach((t, i) => {
    const amt = Number(t.amount) || 0;
    const isIncome = t.type === "Income";
    if (isIncome) balance += amt;
    else balance -= amt;

    const desc = [t.name, t.category].filter(Boolean).join(" · ") || "Transaction";
    doc.font("Helvetica").fontSize(8.5);
    const descH = doc.heightOfString(desc, { width: colDesc - 6 }) + 8;
    const rowH = Math.max(18, descH);

    if (y + rowH > TABLE_BOTTOM) {
      doc.addPage();
      y = MARGIN;
      drawTableHeader(y);
      y += 20;
    }

    const even = i % 2 === 0;
    if (even) doc.rect(MARGIN, y, CONTENT_WIDTH, rowH).fill(LIGHT);

    doc.fillColor(TEXT);
    doc.font("Helvetica").fontSize(8.5);
    doc.text(formatDate(t.parsed), MARGIN + 6, y + (rowH - 10) / 2, { width: colDate - 6 });
    doc.text(desc, MARGIN + colDate + 6, y + 4, { width: colDesc - 6 });

    if (!isIncome) {
      doc.fillColor(DANGER).text(formatINR(amt), MARGIN + colDate + colDesc + 6, y + (rowH - 10) / 2, { width: colDebit - 8, align: "right" });
    }
    if (isIncome) {
      doc.fillColor(SUCCESS).text(formatINR(amt), MARGIN + colDate + colDesc + colDebit + 6, y + (rowH - 10) / 2, { width: colCredit - 8, align: "right" });
    }

    doc.fillColor(TEXT).font("Helvetica-Bold").text(formatINR(balance), MARGIN + CONTENT_WIDTH - colBalance + 4, y + (rowH - 10) / 2, { width: colBalance - 8, align: "right" });

    y += rowH;
  });

  /* ---------- Footers on every page ---------- */
  const range = doc.bufferedPageRange();
  const generatedOn = `Generated on ${formatDate(new Date())}`;
  const footerY = PAGE_HEIGHT - 52;
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    doc.fillColor(MUTED).font("Helvetica").fontSize(7.5).text(generatedOn, MARGIN, footerY);
    doc.text(`Page ${i - range.start + 1} of ${range.count}`, PAGE_WIDTH - MARGIN, footerY, { align: "right" });
  }

  doc.end();
  return done;
}
