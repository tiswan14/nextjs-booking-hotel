"use server";

import { prisma } from "@/lib/prisma";
import { ContactSchema } from "./zod";

export const ContactMessage = async (prevState: unknown, formData: FormData) => {
    const validateField = ContactSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validateField.success) {
        const formattedErrors = validateField.error.issues.reduce(
            (acc, issue) => {
                const field = issue.path[0] as string;
                acc[field] = issue.message;
                return acc;
            },
            {} as Record<string, string>
        );

        return { error: formattedErrors };
    }

    const { name, email, subject, message } = validateField.data;

    try {
        await prisma.contact.create({
            data: {
                name,
                email,
                subject,
                message,
            },
        });

        return { message: "Terima kasih telah menghubungi saya." };
    } catch {
        return { error: { global: "Gagal mengirim pesan. Silakan coba lagi nanti." } };
    }
};
