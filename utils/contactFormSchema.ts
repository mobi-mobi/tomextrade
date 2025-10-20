import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Meno je povinné").max(100, "Meno je príliš dlhé"),
  email: z.string().email("Neplatný formát emailu"),
  company: z.string().max(100, "Názov spoločnosti je príliš dlhý").optional(),
  message: z
    .string()
    .min(1, "Správa je povinná")
    .max(1000, "Správa je príliš dlhá"),
});
