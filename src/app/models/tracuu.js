const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const TracuuSchema = new Schema({
    filepdf: { type: String },
    madangky: { type: String },
    congty: { type: String },
    diachi: { type: String },
    sdt: { type: Number },
    nguoidaidien: { type: String },
    ngaybatdau: { type: String },
    ngaygiahan: { type: String },
    ngayketthuc: { type: String },
    trangthai: { type: String },
    slug: { type: String, slug: 'title' },
    createdAt: { type: Date, default: Date.now }
});
mongoose.plugin(slug);
module.exports = mongoose.model('giaychungnhans', TracuuSchema)