import nc from "next-connect";
import { validateEmail } from "../../../utils/validation";
import db from "../../../utils/db";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import { createActivationToken, createResetToken } from "@/utils/token";
import { sendEmail } from "@/utils/sendEmails";
import { resetEmailTemplate } from "@/emails/resetEmailTemplate";
const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { user_id, password } = req.body;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json({ message: "This Account does not exist." });
    }
    const cryptedPassword = await bcrypt.hash(password, 12);
    await user.updateOne({ password: cryptedPassword });
    res.json({ email: user.email });

    await db.disconnectDb();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});
export default handler;
