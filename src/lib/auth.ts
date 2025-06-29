import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  user_id: string | null;
  full_name: string;
  role_name: 'teacher' | 'admin' | 'media' | 'treasurer' | 'hr' | 'infrastructure' | null;
  employee_id: string | null;
  department: string | null;
  position: string | null;
  phone: string | null;
  avatar_url: string | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
}

// Sign up with email and password
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) throw error;
  return data;
};

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

// Sign out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Get current user
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

// Get user profile
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
};

// Update user profile
export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Reset password
export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) throw error;
};

// Update password
export const updatePassword = async (newPassword: string) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
};

// Check if user is admin
export const isAdmin = async (userId: string): Promise<boolean> => {
  const profile = await getUserProfile(userId);
  return profile?.role_name === 'admin';
};

// Use access code to assign role
export const useAccessCode = async (userId: string, code: string): Promise<boolean> => {
  try {
    // Validate access code
    const { data: accessCode, error: codeError } = await supabase
      .from('access_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();

    if (codeError || !accessCode) {
      throw new Error('Invalid or inactive access code');
    }

    // Check if code has expired
    if (accessCode.expires_at && new Date(accessCode.expires_at) < new Date()) {
      throw new Error('Access code has expired');
    }

    // Update user profile with role
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({ 
        role_name: accessCode.role_name,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (updateError) throw updateError;

    return true;
  } catch (error) {
    console.error('Error using access code:', error);
    throw error;
  }
};