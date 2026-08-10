-- Finance Dashboard - Cards
-- Cards are lightweight: only a name, last 4 digits, and bank name.
-- Full card numbers are intentionally NOT stored.

CREATE TABLE cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  last4 TEXT NOT NULL CHECK (last4 ~ '^[0-9]{4}$'),
  bank_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_cards_user_id ON cards(user_id);

-- Row Level Security (RLS)
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

-- Cards: full CRUD on own data only
CREATE POLICY "Users can view own cards" ON cards
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cards" ON cards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cards" ON cards
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cards" ON cards
  FOR DELETE USING (auth.uid() = user_id);
