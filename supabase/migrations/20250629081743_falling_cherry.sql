/*
  # Buat Akun Demo untuk Admin dan User

  1. Akun Demo
    - Admin: admin@demo.com / password123
    - User: user@demo.com / password123
  
  2. Data Profile
    - Admin dengan role 'admin'
    - User dengan role 'teacher'
  
  3. Kode Akses
    - Memastikan kode akses tersedia untuk testing
*/

-- Insert demo users ke auth.users (ini biasanya dilakukan melalui Supabase Auth API)
-- Tapi kita bisa membuat profile langsung dengan user_id yang akan dibuat

-- Pastikan kode akses demo tersedia
INSERT INTO access_codes (code, role_name, is_active) VALUES
  ('DEMO_ADMIN_2024', 'admin', true),
  ('DEMO_USER_2024', 'teacher', true),
  ('DEMO_MEDIA_2024', 'media', true),
  ('DEMO_HR_2024', 'hr', true),
  ('DEMO_TREASURER_2024', 'treasurer', true),
  ('DEMO_INFRA_2024', 'infrastructure', true)
ON CONFLICT (code) DO UPDATE SET
  is_active = EXCLUDED.is_active,
  updated_at = now();

-- Update existing access codes untuk memastikan mereka aktif
UPDATE access_codes SET 
  is_active = true,
  updated_at = now()
WHERE code IN ('TEACHER2024', 'ADMIN2024', 'MEDIA2024', 'TREASURER2024', 'HR2024', 'INFRA2024');

-- Buat function untuk setup demo user profile
CREATE OR REPLACE FUNCTION setup_demo_profile(
  p_user_id uuid,
  p_full_name text,
  p_role_name text,
  p_employee_id text DEFAULT NULL,
  p_department text DEFAULT NULL,
  p_position text DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO user_profiles (
    user_id,
    full_name,
    role_name,
    employee_id,
    department,
    position,
    is_active
  ) VALUES (
    p_user_id,
    p_full_name,
    p_role_name,
    p_employee_id,
    p_department,
    p_position,
    true
  )
  ON CONFLICT (user_id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role_name = EXCLUDED.role_name,
    employee_id = EXCLUDED.employee_id,
    department = EXCLUDED.department,
    position = EXCLUDED.position,
    is_active = EXCLUDED.is_active,
    updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Tambahkan policy untuk admin bisa melihat semua profiles
CREATE POLICY "Admins can read all profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.user_id = auth.uid() AND up.role_name = 'admin'
    )
  );

-- Tambahkan policy untuk admin bisa manage access codes
CREATE POLICY "Admins can manage access codes"
  ON access_codes
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.user_id = auth.uid() AND up.role_name = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.user_id = auth.uid() AND up.role_name = 'admin'
    )
  );