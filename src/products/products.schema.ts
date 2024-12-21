import mongoose from "mongoose";
import {products} from "./products.interface";


const productsSchema = new mongoose.Schema<products>({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'subcategories' },
    price: { type: Number, required: true },
    discount: { type: Number },
    priceAfterDiscount: { type: Number },
    quantity: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    rateAvg: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    cover: String,
    images: [String]
}, {toJSON: {virtuals: true}, toObject: {virtuals: true},timestamps: true });

productsSchema.virtual('reviews', {localField: '_id', foreignField: 'product', ref: 'reviews'})
const imagesUrl = (document: products) => {
    if (document.cover) document.cover = `${process.env.BASE_URL}/images/products/${document.cover}`;
    if (document.images) document.images = document.images.map(image => `${process.env.BASE_URL}/images/products/${image}`);
};

productsSchema
    .post('init', imagesUrl)
    .post('save', imagesUrl);


productsSchema.pre<products>(/^find/, function (next) {
    this.populate({ path: 'subcategory', select: 'name image' });
    next();
})

export default mongoose.model<products>('products', productsSchema);