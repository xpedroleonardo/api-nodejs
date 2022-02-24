import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Example } from "../entity/Example";

interface AuthParams {
  email: string;
  password: string;
}

export const authUserService = async ({ email, password }: AuthParams) => {
  const user = await getRepository(Example).findOne({ email: email });

  if (!user) {
    return false;
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    return false;
  }

  const token = sign(
    {
      email: email,
    },
    process.env.JWT_SECRET,
    {
      subject: JSON.stringify(user.id),
      expiresIn: "1d",
    }
  );

  return token;
};
