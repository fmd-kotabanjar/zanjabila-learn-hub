/*
  # Authentication and User Management Schema

  1. New Tables
    - `profiles` - Extended user information with roles
    - `access_codes` - Manage premium content access codes  
    - `user_programs` - Track program enrollments
    - `user_progress` - Detailed learning progress tracking
    - `saved_content` - User bookmarks and favorites
    - `purchase_history` - Transaction tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
    - Admin-only policies for management functions

  3. Functions
    - Auto-create profile on user registration
    - Default access codes for premium content
*/

-- Create profiles table for extended user information
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create access codes table
CREATE TABLE IF NOT EXISTS access_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  program_type text NOT NULL,
  program_id text,
  is_active boolean DEFAULT true,
  max_uses integer DEFAULT 1,
  current_uses integer DEFAULT 0,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Create user programs table for enrollment tracking
CREATE TABLE IF NOT EXISTS user_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  program_id text NOT NULL,
  program_title text NOT NULL,
  access_code_used text,
  enrolled_at timestamptz DEFAULT now(),
  progress integer DEFAULT 0,
  completed_at timestamptz,
  UNIQUE(user_id, program_id)
);

-- Create user progress table for detailed tracking
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  program_id text NOT NULL,
  lesson_id text NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  time_spent integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, program_id, lesson_id)
);

-- Create saved content table for bookmarks
CREATE TABLE IF NOT EXISTS saved_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type text NOT NULL CHECK (content_type IN ('article', 'ebook', 'video')),
  content_id text NOT NULL,
  content_title text NOT NULL,
  saved_at timestamptz DEFAULT now(),
  UNIQUE(user_id, content_type, content_id)
);

-- Create purchase history table
CREATE TABLE IF NOT EXISTS purchase_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type text NOT NULL,
  item_id text NOT NULL,
  item_title text NOT NULL,
  amount decimal(10,2),
  currency text DEFAULT 'IDR',
  status text DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method text,
  transaction_id text,
  purchased_at timestamptz DEFAULT now()
);

-- Enable RLS on tables that don't have it yet
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'profiles'
  ) THEN
    ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'access_codes'
  ) THEN
    ALTER TABLE access_codes ENABLE ROW LEVEL SECURITY;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'user_programs'
  ) THEN
    ALTER TABLE user_programs ENABLE ROW LEVEL SECURITY;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'user_progress'
  ) THEN
    ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'saved_content'
  ) THEN
    ALTER TABLE saved_content ENABLE ROW LEVEL SECURITY;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'purchase_history'
  ) THEN
    ALTER TABLE purchase_history ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Drop existing policies if they exist to avoid conflicts
DO $$
BEGIN
  -- Profiles policies
  DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
  DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
  
  -- Access codes policies
  DROP POLICY IF EXISTS "Anyone can read active access codes" ON access_codes;
  DROP POLICY IF EXISTS "Admins can manage access codes" ON access_codes;
  
  -- User programs policies
  DROP POLICY IF EXISTS "Users can read own programs" ON user_programs;
  DROP POLICY IF EXISTS "Users can insert own programs" ON user_programs;
  DROP POLICY IF EXISTS "Users can update own programs" ON user_programs;
  DROP POLICY IF EXISTS "Admins can read all programs" ON user_programs;
  
  -- User progress policies
  DROP POLICY IF EXISTS "Users can manage own progress" ON user_progress;
  
  -- Saved content policies
  DROP POLICY IF EXISTS "Users can manage own saved content" ON saved_content;
  
  -- Purchase history policies
  DROP POLICY IF EXISTS "Users can read own purchase history" ON purchase_history;
  DROP POLICY IF EXISTS "Users can insert own purchases" ON purchase_history;
  DROP POLICY IF EXISTS "Admins can read all purchases" ON purchase_history;
END $$;

-- Create new policies
-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Access codes policies
CREATE POLICY "Anyone can read active access codes"
  ON access_codes
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Admins can manage access codes"
  ON access_codes
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- User programs policies
CREATE POLICY "Users can read own programs"
  ON user_programs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own programs"
  ON user_programs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own programs"
  ON user_programs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can read all programs"
  ON user_programs
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- User progress policies
CREATE POLICY "Users can manage own progress"
  ON user_progress
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Saved content policies
CREATE POLICY "Users can manage own saved content"
  ON saved_content
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Purchase history policies
CREATE POLICY "Users can read own purchase history"
  ON purchase_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own purchases"
  ON purchase_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can read all purchases"
  ON purchase_history
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Function to handle user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop and recreate trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Insert default access codes (only if they don't exist)
INSERT INTO access_codes (code, program_type, program_id, max_uses) VALUES
  ('AKTKITA2024', 'program', 'akademi-tumbuh-kita', 1000),
  ('ZAAD2024', 'program', 'zaad', 1000),
  ('KOLABORASI24', 'program', 'kolaborasi', 1000),
  ('EBOOK2024', 'ebook', 'premium-ebooks', 1000),
  ('ARTIKEL2024', 'article', 'premium-articles', 1000)
ON CONFLICT (code) DO NOTHING;