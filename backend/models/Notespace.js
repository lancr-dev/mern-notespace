import mongoose from 'mongoose';

const notespaceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Notespace = mongoose.model('Notespace', notespaceSchema);

export default Notespace;
