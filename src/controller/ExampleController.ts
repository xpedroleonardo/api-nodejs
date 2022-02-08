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
  const avatar = req.file.filename;

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
    avatar,
  });

  return res.json({ created_user: example, message: "Successfully created!" });
};

export const updateExample = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, age, username } = req.body;
  const avatar = req.file.filename;

  deleteImage(id);

  const passwordHash = await hash(password, 8);

  const example = await getRepository(Example).update(id, {
    name,
    email,
    password: passwordHash,
    age,
    username,
    avatar,
  });

  if (example.affected === 1) {
    const exampleUpdated = await getRepository(Example).findOne(id);
    return res.json({
      updated_user: exampleUpdated,
      message: "Successfully updated!",
    });
  }

  return res.json({ message: "Register not found!" });
};

export const selectOneExample = async (req: Request, res: Response) => {
  const { id } = req.params;

  const example = await getRepository(Example).findOne(id);

  if (!example) {
    return res.json({ message: "Register not found!" });
  }

  return res.json(example);
};

export const selectExample = async (req: Request, res: Response) => {
  const example = await getRepository(Example).find({
    order: { id: "DESC" },
  });

  if (example.length === 0) {
    return res.json({ message: "No data in database!" });
  }

  return res.json(example);
};

export const authenticateExample = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const token = await authUserService({ email, password });

  return res.json({ token });
};

const deleteImage = async (id: string) => {
  const { avatar } = await getRepository(Example).findOne(id);
  unlink(path.resolve(__dirname, "..", "images", avatar), (err) => {
    if (err) throw err;
  });
};
