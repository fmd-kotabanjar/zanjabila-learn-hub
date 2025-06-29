import { supabase } from '@/integrations/supabase/client';

export interface AccessCode {
  id: string;
  code: string;
  program_type: string;
  program_id: string | null;
  is_active: boolean;
  max_uses: number;
  current_uses: number;
  expires_at: string | null;
  created_at: string;
}

export interface UserProgram {
  id: string;
  user_id: string;
  program_id: string;
  program_title: string;
  access_code_used: string | null;
  enrolled_at: string;
  progress: number;
  completed_at: string | null;
}

export interface UserProgress {
  id: string;
  user_id: string;
  program_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at: string | null;
  time_spent: number;
  created_at: string;
}

export interface SavedContent {
  id: string;
  user_id: string;
  content_type: 'article' | 'ebook' | 'video';
  content_id: string;
  content_title: string;
  saved_at: string;
}

export interface PurchaseHistory {
  id: string;
  user_id: string;
  item_type: string;
  item_id: string;
  item_title: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: string | null;
  transaction_id: string | null;
  purchased_at: string;
}

// Validate access code
export const validateAccessCode = async (code: string): Promise<AccessCode | null> => {
  const { data, error } = await supabase
    .from('access_codes')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Error validating access code:', error);
    return null;
  }

  // Check if code has reached max uses
  if (data.current_uses >= data.max_uses) {
    return null;
  }

  // Check if code has expired
  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return null;
  }

  return data;
};

// Use access code to enroll in program
export const useAccessCode = async (
  userId: string,
  code: string,
  programId: string,
  programTitle: string
): Promise<boolean> => {
  try {
    // First validate the code
    const accessCode = await validateAccessCode(code);
    if (!accessCode) {
      throw new Error('Invalid or expired access code');
    }

    // Check if user already has access to this program
    const { data: existingProgram } = await supabase
      .from('user_programs')
      .select('id')
      .eq('user_id', userId)
      .eq('program_id', programId)
      .single();

    if (existingProgram) {
      throw new Error('You already have access to this program');
    }

    // Start transaction-like operations
    // 1. Increment code usage
    const { error: updateError } = await supabase
      .from('access_codes')
      .update({ current_uses: accessCode.current_uses + 1 })
      .eq('id', accessCode.id);

    if (updateError) throw updateError;

    // 2. Enroll user in program
    const { error: enrollError } = await supabase
      .from('user_programs')
      .insert({
        user_id: userId,
        program_id: programId,
        program_title: programTitle,
        access_code_used: code,
      });

    if (enrollError) throw enrollError;

    return true;
  } catch (error) {
    console.error('Error using access code:', error);
    throw error;
  }
};

// Get user's enrolled programs
export const getUserPrograms = async (userId: string): Promise<UserProgram[]> => {
  const { data, error } = await supabase
    .from('user_programs')
    .select('*')
    .eq('user_id', userId)
    .order('enrolled_at', { ascending: false });

  if (error) {
    console.error('Error fetching user programs:', error);
    return [];
  }

  return data || [];
};

// Update user progress
export const updateUserProgress = async (
  userId: string,
  programId: string,
  lessonId: string,
  completed: boolean = true,
  timeSpent: number = 0
): Promise<void> => {
  const { error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      program_id: programId,
      lesson_id: lessonId,
      completed,
      completed_at: completed ? new Date().toISOString() : null,
      time_spent: timeSpent,
    });

  if (error) {
    console.error('Error updating progress:', error);
    throw error;
  }
};

// Get user progress for a program
export const getUserProgress = async (
  userId: string,
  programId: string
): Promise<UserProgress[]> => {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('program_id', programId);

  if (error) {
    console.error('Error fetching user progress:', error);
    return [];
  }

  return data || [];
};

// Save content (bookmark)
export const saveContent = async (
  userId: string,
  contentType: 'article' | 'ebook' | 'video',
  contentId: string,
  contentTitle: string
): Promise<void> => {
  const { error } = await supabase
    .from('saved_content')
    .upsert({
      user_id: userId,
      content_type: contentType,
      content_id: contentId,
      content_title: contentTitle,
    });

  if (error) {
    console.error('Error saving content:', error);
    throw error;
  }
};

// Remove saved content
export const removeSavedContent = async (
  userId: string,
  contentType: string,
  contentId: string
): Promise<void> => {
  const { error } = await supabase
    .from('saved_content')
    .delete()
    .eq('user_id', userId)
    .eq('content_type', contentType)
    .eq('content_id', contentId);

  if (error) {
    console.error('Error removing saved content:', error);
    throw error;
  }
};

// Get user's saved content
export const getSavedContent = async (userId: string): Promise<SavedContent[]> => {
  const { data, error } = await supabase
    .from('saved_content')
    .select('*')
    .eq('user_id', userId)
    .order('saved_at', { ascending: false });

  if (error) {
    console.error('Error fetching saved content:', error);
    return [];
  }

  return data || [];
};

// Add purchase to history
export const addPurchaseHistory = async (
  userId: string,
  itemType: string,
  itemId: string,
  itemTitle: string,
  amount: number,
  paymentMethod?: string,
  transactionId?: string
): Promise<void> => {
  const { error } = await supabase
    .from('purchase_history')
    .insert({
      user_id: userId,
      item_type: itemType,
      item_id: itemId,
      item_title: itemTitle,
      amount,
      payment_method: paymentMethod,
      transaction_id: transactionId,
    });

  if (error) {
    console.error('Error adding purchase history:', error);
    throw error;
  }
};

// Get user's purchase history
export const getPurchaseHistory = async (userId: string): Promise<PurchaseHistory[]> => {
  const { data, error } = await supabase
    .from('purchase_history')
    .select('*')
    .eq('user_id', userId)
    .order('purchased_at', { ascending: false });

  if (error) {
    console.error('Error fetching purchase history:', error);
    return [];
  }

  return data || [];
};