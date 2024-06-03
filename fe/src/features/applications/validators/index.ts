import { z } from "zod";

export const createApplicationSchema = z.object({
  name: z.string(),
});

export type CreateApplicationSchema = z.infer<typeof createApplicationSchema>;
