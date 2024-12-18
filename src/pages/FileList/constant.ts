import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "File name is required"),
});