const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete')
const BaiVietSchema = new Schema({
    title: { type: String },
    image: { type: String },
    category: { type: String },
    content: { type: String },
    slug: { type: String, slug: 'title' },
    date: { type: String },
    createdAt: { type: Date, default: Date.now }
});

//add plugin
mongoose.plugin(slug);
BaiVietSchema.plugin(mongooseDelete, {
    deleteAt: true,
    overrideMethods: 'all'
});
module.exports = mongoose.model('baiviets', BaiVietSchema)