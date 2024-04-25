import { z } from 'zod';

const SignupFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

type SignupFormData = z.infer<typeof SignupFormSchema>;

export const signup = async (formData: SignupFormData) => {
  try {
    SignupFormSchema.parse(formData);

    const response = await fetch(process.env.SERVER_URL + '/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Signup failed:', error);
    throw error;
  }
};
