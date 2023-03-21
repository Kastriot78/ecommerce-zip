import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  isAdmin: boolean;
}

const userSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  isAdmin: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: new Date() },
});

userSchema.pre("save", async function (next) {
  // pra po dojm me bo diqka para se useri me u rujt ne databaz, po ja bojm hash passwordin
  const user = this; //tek useri i caktuar i cili po bohet save

  if (user.isModified("password")) {
    // eshte true kur useri krijohet per her t par, apo kur useri bohet update(qe ja kemi bo update passwordin pra)
    user.password = await bcrypt.hash(user.password, 8);
  }

  next(); // e thirrim kete metod kur t kryjm pun, pra e kemi bo hashpaswordin u kry puna, sepse ndryshe kjo metod thirret infinite sepse sdihet se kur u perfundu
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
