import z from "zod";

//TODO: make this captailise and add more validation
export const loginSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  jobTitle: z
    .string()
    .min(8, { message: "Job title must be at least 8 characters long." }),
});

export type User = z.infer<typeof loginSchema>;
