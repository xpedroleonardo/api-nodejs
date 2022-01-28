import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Example } from "../entity/Example";

interface AuthParams {
  emailAuth: string;
  passAuth: string;
}

export const authUserService = async ({ emailAuth, passAuth }: AuthParams) => {
  const { id, email, password } = await getRepository(Example).findOne(
    emailAuth
  );

  if (!email) {
    throw new Error("Email/Password incorrect!");
  }

  const passwordMatch = await compare(passAuth, password);

  if (!passwordMatch) {
    throw new Error("Email/Password incorrect!");
  }

  const token = sign(
    {
      email: email,
    },
    "ffhanku-dfjnasdk",
    {
      subject: JSON.stringify(id),
      expiresIn: "1d",
    }
  );

  return token;
};
