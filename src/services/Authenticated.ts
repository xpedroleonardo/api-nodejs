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
    throw new Error("Email/Password incorrect!");
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Email/Password incorrect!");
  }

  const token = sign(
    {
      email: email,
    },
    "exampleapijwtoken",
    {
      subject: JSON.stringify(user.id),
      expiresIn: "1d",
    }
  );

  return token;
};
