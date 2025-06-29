import { supabase } from '@/integrations/supabase/client';

export interface DemoAccount {
  email: string;
  password: string;
  fullName: string;
  role: string;
  employeeId?: string;
  department?: string;
  position?: string;
}

export const demoAccounts: DemoAccount[] = [
  {
    email: 'admin@demo.com',
    password: 'password123',
    fullName: 'Admin Demo',
    role: 'admin',
    employeeId: 'ADM001',
    department: 'IT',
    position: 'System Administrator'
  },
  {
    email: 'user@demo.com',
    password: 'password123',
    fullName: 'User Demo',
    role: 'teacher',
    employeeId: 'TCH001',
    department: 'Education',
    position: 'Teacher'
  },
  {
    email: 'media@demo.com',
    password: 'password123',
    fullName: 'Media Demo',
    role: 'media',
    employeeId: 'MED001',
    department: 'Media',
    position: 'Content Creator'
  },
  {
    email: 'hr@demo.com',
    password: 'password123',
    fullName: 'HR Demo',
    role: 'hr',
    employeeId: 'HR001',
    department: 'Human Resources',
    position: 'HR Manager'
  }
];

export const createDemoAccount = async (account: DemoAccount) => {
  try {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: account.email,
      password: account.password,
      options: {
        data: {
          full_name: account.fullName,
        },
      },
    });

    if (authError) {
      console.error(`Error creating auth user for ${account.email}:`, authError);
      return { success: false, error: authError.message };
    }

    if (!authData.user) {
      return { success: false, error: 'No user data returned' };
    }

    // 2. Wait a bit for the trigger to create the profile
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 3. Update the profile with role and additional info
    const { error: profileError } = await supabase
      .from('user_profiles')
      .update({
        role_name: account.role,
        employee_id: account.employeeId,
        department: account.department,
        position: account.position,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', authData.user.id);

    if (profileError) {
      console.error(`Error updating profile for ${account.email}:`, profileError);
      return { success: false, error: profileError.message };
    }

    console.log(`✅ Demo account created: ${account.email} (${account.role})`);
    return { success: true, user: authData.user };

  } catch (error) {
    console.error(`Error creating demo account ${account.email}:`, error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const createAllDemoAccounts = async () => {
  console.log('🚀 Creating demo accounts...');
  
  const results = [];
  
  for (const account of demoAccounts) {
    const result = await createDemoAccount(account);
    results.push({ account: account.email, ...result });
    
    // Wait between account creations to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('📊 Demo account creation results:', results);
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`✅ Successfully created: ${successful} accounts`);
  console.log(`❌ Failed to create: ${failed} accounts`);
  
  return results;
};

// Function to check if demo accounts exist
export const checkDemoAccounts = async () => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('full_name, role_name, employee_id')
      .in('employee_id', ['ADM001', 'TCH001', 'MED001', 'HR001']);

    if (error) {
      console.error('Error checking demo accounts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error checking demo accounts:', error);
    return [];
  }
};