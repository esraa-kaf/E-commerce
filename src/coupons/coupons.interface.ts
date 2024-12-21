import { Document } from "mongoose"
export interface Coupons extends Document {
    readonly name: string,
    readonly discount: number,
    readonly expireTime:Date
}