import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { unlink } from "fs";
import { hash } from "bcryptjs";
import path from "path";

import { Example } from "../entity/Example";
import { authUserService } from "../services/Authenticated";

export const deleteExample = async (req: Request, res: Response) => {
  const { id } = req.params;
  let message: string;

  deleteImage(id);

  const example = await getRepository(Example).delete(id);

  if (example.affected === 1) {
    message = "Successfully deleted!";
  } else {
    message = "Register not found!!!";
  }

  return res.json({ message });
};

export const createExample = async (req: Request, res: Response) => {
  const { name, email, password, age, username } = req.body;
  const avatar = req.file?.filename;

  const passwordHash = await hash(password, 8);

  const userAlreadyExist = await getRepository(Example).findOne({
    email,
    username,
  });

  if (userAlreadyExist) {
    return res.json({ message: "User already exists!" });
  }

  const example = await getRepository(Example).save({
    name,
    email,
    password: passwordHash,
    age,
    username,
    avatar: avatar ? avatar : "",
  });

  const user = {
    id: example.id,
    age: example.age,
    name: example.name,
    email: example.email,
    avatar: example.avatar,
    username: example.username,
  };

  return res.json({ user, message: "Successfully created!" });
};

export const updateExample = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, age, username } = req.body;
  const avatar = req.file?.filename;

  deleteImage(id);

  const passwordHash = await hash(password, 8);

  const example = await getRepository(Example).update(id, {
    name,
    email,
    password: passwordHash,
    age,
    username,
    avatar: avatar ? avatar : "",
  });

  if (example.affected === 1) {
    const user = await getRepository(Example).findOne(id, {
      select: ["id", "age", "name", "email", "avatar", "username"],
    });

    return res.json({
      user,
      message: "Successfully updated!",
    });
  }

  return res.json({ message: "Register not found!" });
};

export const selectOneExample = async (req: Request, res: Response) => {
  const { id } = req.params;

  const example = await getRepository(Example).findOne(id, {
    select: ["id", "age", "name", "email", "avatar", "username"],
  });

  if (!example) {
    return res.json({ message: "Register not found!" });
  }

  return res.json(example);
};

export const selectExample = async (req: Request, res: Response) => {
  const example = await getRepository(Example).find({
    order: { id: "DESC" },
    select: ["id", "age", "name", "email", "avatar", "username"],
  });

  if (example.length === 0) {
    return res.json({ message: "No records in the database!" });
  }

  return res.json(example);
};

export const authenticateExample = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const token = await authUserService({ email, password });

  if (token == false) {
    return res.json({ message: "Email/Password incorrect! false" });
  }

  return res.json({ token, message: "User Authenticated!" });
};

const deleteImage = async (id: string) => {
  const { avatar } = await getRepository(Example).findOne(id);

  if (!avatar) return;

  unlink(path.resolve(__dirname, "..", "images", avatar), (err) => {
    if (err) throw err;
  });
};
