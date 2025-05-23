import { object, string, coerce, array } from "zod";

export const RoomSchema = object({
    name: string().min(3),
    description: string().min(30),
    capacity: coerce.number().gt(0),
    price: coerce.number().gt(0),
    amenities: array(string()).nonempty(),
})

export const ContactSchema = object({
    name: string().min(3, "Nama minimal 3 karakter"),
    email: string().min(3, "Email harus terdiri dari minimal 3 karakter").email("Format email tidak valid"),
    subject: string().min(5, "Subjek harus terdiri dari minimal 5 karakter"),
    message: string()
        .min(10, "Pesan harus terdiri dari minimal 10 karakter")
        .max(200, "Pesan tidak boleh melebihi 200 karakter"),
});


export const ReserveSchema = object({
    name: string().min(3),
    phone: string().min(3),
})