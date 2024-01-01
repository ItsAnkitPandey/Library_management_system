import mongoose from "mongoose";

const AdminModel = mongoose.Schema({
  username: {
    type: String,
    required: true, 
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'admin',
  }
});

export const Admin = mongoose.model('Admin', AdminModel);


