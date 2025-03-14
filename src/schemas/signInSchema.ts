import { z } from 'zod';
export const signInSchema = z.object({
	identifier: z.string().min(2, 'Username or email must in a proper format'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
});
