import { z } from 'zod';

const pouchSizes = z.enum(['A', 'B', 'C', 'D', 'E', 'F']);

export const catSchema = z.object({
  name: z.string(),
  subscriptionActive: z.boolean(),
  breed: z.string(),
  pouchSize: pouchSizes,
});

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  cats: z.array(catSchema),
});

export type User = z.infer<typeof userSchema>;
export type Cat = z.infer<typeof catSchema>;
export type PouchSize = z.infer<typeof pouchSizes>;
