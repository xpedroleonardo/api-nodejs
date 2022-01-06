import { getRepository } from "typeorm";
import { Request, Response } from "express";

import { Example } from "../entity/Example";

export const deleteExample = async (req: Request, res: Response) => {
  const { id } = req.params;
  let message: string;

  const example = await getRepository(Example).delete(id);

  if (example.affected === 1) {
    message = "Successfully deleted!";
  } else {
    message = "Register not found!!!";
  }

  return res.json({ message });
};

export const createExample = async (req: Request, res: Response) => {
  const { name, age, username } = req.body;
  const avatar = req.file.filename;

  const example = await getRepository(Example).save({ name, age, username });
  return res.json({ createdUser: example, message: "Successfully created!" });
};

export const updateExample = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, age, username } = req.body;
  const avatar = req.file.filename;

  const example = await getRepository(Example).update(id, {
    name,
    age,
    username,
  });

  if (example.affected === 1) {
    const exampleUpdated = await getRepository(Example).findOne(id);
    return res.json({
      UpdatedUser: exampleUpdated,
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
