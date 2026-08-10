-- Finance Dashboard - Company / Bank Statement Details
-- Stored on the existing users table for use in bank-statement PDF exports.

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS company_name TEXT,
  ADD COLUMN IF NOT EXISTS account_holder_name TEXT,
  ADD COLUMN IF NOT EXISTS account_number TEXT,
  ADD COLUMN IF NOT EXISTS account_type TEXT DEFAULT 'Savings',
  ADD COLUMN IF NOT EXISTS bank_name TEXT,
  ADD COLUMN IF NOT EXISTS ifsc_code TEXT,
  ADD COLUMN IF NOT EXISTS branch_address TEXT;
