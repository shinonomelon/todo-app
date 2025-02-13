'use server';

import { ActionResponse, UpdatePasswordFormData } from '@/types/auth';

import { updatePasswordSchema } from '@/lib/schema/auth';
import { createClient } from '@/lib/supabase/server';

export async function updatePassword(
  _: ActionResponse<UpdatePasswordFormData>,
  formData: FormData
): Promise<ActionResponse<UpdatePasswordFormData>> {
  const searchParams = new URL(formData.get('url') as string).searchParams;
  const token = searchParams.get('token');

  if (!token) {
    return {
      success: false,
      state: {
        password: ''
      },
      message: 'トークンが無効または見つかりません'
    };
  }

  const rawData: UpdatePasswordFormData = {
    password: formData.get('password') as string
  };

  const validatedData = updatePasswordSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      state: rawData,
      message: 'フォームのエラーを修正してください',
      errors: validatedData.error.flatten().fieldErrors
    };
  }

  const { password } = validatedData.data;

  const supabase = await createClient();

  const { error: tokenError } = await supabase.auth.verifyOtp({
    token_hash: token,
    type: 'email'
  });

  if (tokenError) {
    return {
      success: false,
      state: rawData,
      message: tokenError.message
    };
  }

  const { error } = await supabase.auth.updateUser({
    password
  });

  if (error) {
    return {
      success: false,
      state: rawData,
      message: error.message
    };
  }

  return {
    success: true,
    state: rawData,
    message: 'パスワードを更新しました'
  };
}
