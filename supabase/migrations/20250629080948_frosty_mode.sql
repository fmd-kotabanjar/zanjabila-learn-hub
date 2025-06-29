/*
  # Reset Database - Hapus dan Buat Ulang Semua Tabel
  
  1. Drop semua tabel yang ada
  2. Buat ulang tabel sesuai schema yang diberikan:
     - user_profiles (sesuai dengan schema yang ada)
     - access_codes (sesuai dengan schema yang ada)
  3. Setup RLS dan policies
  4. Insert data default
*/

-- Drop semua tabel yang mungkin ada
DROP TABLE IF EXISTS user_progress CASCADE;
DROP TABLE IF EXISTS saved_content CASCADE;
DROP TABLE IF EXISTS purchase_history CASCADE;
DROP TABLE IF EXISTS user_programs CASCADE;
DROP TABLE IF EXISTS access_codes CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Drop functions dan triggers yang mungkin ada
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;

-- Buat tabel user_profiles sesuai schema yang diberikan
CREATE TABLE user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  role_name text CHECK (role_name IN ('teacher', 'admin', 'media', 'treasurer', 'hr', 'infrastructure')),
  employee_id text UNIQUE,
  department text,
  position text,
  phone text,
  avatar_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Buat tabel access_codes sesuai schema yang diberikan
CREATE TABLE access_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  role_name text NOT NULL CHECK (role_name IN ('teacher', 'admin', 'media', 'treasurer', 'hr', 'infrastructure')),
  is_active boolean DEFAULT true,
  expires_at timestamptz,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE access_codes ENABLE ROW LEVEL SECURITY;

-- Policies untuk user_profiles
CREATE POLICY "System can insert profiles"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Policies untuk access_codes
CREATE POLICY "Anyone can read active access codes"
  ON access_codes
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Function untuk handle user baru
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO user_profiles (user_id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger untuk user baru
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Insert default access codes
INSERT INTO access_codes (code, role_name) VALUES
  ('TEACHER2024', 'teacher'),
  ('ADMIN2024', 'admin'),
  ('MEDIA2024', 'media'),
  ('TREASURER2024', 'treasurer'),
  ('HR2024', 'hr'),
  ('INFRA2024', 'infrastructure')
ON CONFLICT (code) DO NOTHING;