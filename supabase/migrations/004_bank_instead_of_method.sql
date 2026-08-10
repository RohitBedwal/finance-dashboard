-- Finance Dashboard - Replace transactions.method with bank
-- Transactions now record which bank a transaction belongs to,
-- stored as e.g. "HDFC ****1234" (bank name + masked last 4 digits).

ALTER TABLE transactions RENAME COLUMN method TO bank;
