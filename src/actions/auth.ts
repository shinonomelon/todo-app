'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { createClient } from '../lib/supabase/server';

export const signUpSchema = z
  .object({
    email: z
      .string()
      .email({ message: '有効なメールアドレスを入力してください' }),
    password: z.string().min(12, { message: 'パスワードは最低12文字必要です' }),
    confirmPassword: z
      .string()
      .min(12, { message: '確認用のパスワードを入力してください' })
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'パスワードが一致しません',
        path: ['confirmPassword']
      });
    }
  });

export const signInSchema = z.object({
  email: z
    .string()
    .email({ message: '有効なメールアドレスを入力してください' }),
  password: z.string().min(12, { message: 'パスワードは最低12文字必要です' })
});

type SignupFormData = {
  email: string;
  password: string;
  confirmPassword?: string;
};

type SigninFormData = Omit<SignupFormData, 'confirmPassword'>;

type ActionResponse<T> =
  | {
      state: T;
      message: string;
      errors?: {
        [K in keyof T]?: string[];
      };
    }
  | undefined;

export async function signin(
  _: ActionResponse<SigninFormData>,
  formData: FormData
): Promise<ActionResponse<SigninFormData>> {
  const rawData: SigninFormData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  };

  const validatedData = signInSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      state: rawData,
      message: 'フォームのエラーを修正してください',
      errors: validatedData.error.flatten().fieldErrors
    };
  }

  const { email, password } = validatedData.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return {
      state: rawData,
      message: error.message
    };
  }

  revalidatePath('/app', 'layout');
  redirect('/app');
}

export async function signup(
  _: ActionResponse<SignupFormData>,
  formData: FormData
): Promise<ActionResponse<SignupFormData>> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const rawData: SignupFormData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string
  };

  const validatedData = signUpSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      state: rawData,
      message: 'フォームのエラーを修正してください',
      errors: validatedData.error.flatten().fieldErrors
    };
  }

  const { email, password } = validatedData.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    return {
      state: rawData,
      message: error.message
    };
  }

  revalidatePath('/app', 'layout');
  redirect('/app');
}
