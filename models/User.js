// import mongoose from "mongoose";

// const { Schema } = mongoose;

// const UserSchema = new Schema({
//   owner: { type: String, required: true },
//   email: [{ type: String, required: true }],
//   entries: [
//     {
//       id: { type: Number, required: true },
//       date: { type: Date, required: true },
//       weight: { type: Number, required: true },
//       feeling: { type: String, required: true },
//     },
//   ],
//   projection: { type: Number, required: true },
//   impressions: [
//     {
//       id: { type: Number, required: true },
//       comment: { type: Number, required: true },
//       date: { type: Number, required: true },
//     },
//   ],
// });

// const User = mongoose.models.User || mongoose.model("User", UserSchema);

// export default User;

import mongoose from "mongoose";

const { Schema } = mongoose;

const EntrySchema = new Schema({
  id: { type: String, required: true },
  date: { type: Date, required: true },
  weight: { type: Number, required: true },
  feeling: { type: String, required: true },
});

const ImpressionSchema = new Schema({
  id: { type: String, required: true },
  comment: { type: String, required: true },
  date: { type: Date, required: true },
});

const UserSchema = new Schema({
  owner: { type: String, required: true },
  email: [{ type: String, required: true }],
  entries: [EntrySchema],
  projection: { type: Number, required: true },
  impressions: [ImpressionSchema],
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
