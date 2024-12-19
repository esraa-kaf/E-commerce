import {Document ,Schema} from "mongoose";

export interface Users extends Document {
    readonly username: string;
    readonly email: string;
    readonly name: string;
    password: string;
    readonly role: Role;
    readonly active: boolean;
     googleId: string;
     wishlist: Schema.Types.ObjectId[];
     address:Address[]
    hasPassword: boolean;
    passwordChangedAt: Date | number;
    passwordResetCode: string | undefined;
    passwordResetCodeExpires: Date | number | undefined;
    passwordResetCodeVerify: boolean | undefined;
    image: string;
}

type Role = "admin" | "employee" | "user";
export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
}