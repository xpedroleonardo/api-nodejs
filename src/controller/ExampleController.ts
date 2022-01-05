import { getRepository } from "typeorm";
import { Request, Response } from "express";

import { Example } from "../entity/Example";

export const deleteExample = async (req: Request, res: Response) => {
  const { id } = req.params;
};

export const createExample = async (req: Request, res: Response) => {
  const { nome, idade } = req.body;
};

export const updateExample = async (req: Request, res: Response) => {
  const { id } = req.params;
};

export const selectOneExample = async (req: Request, res: Response) => {
  const { id } = req.params;
};

export const selectAllExample = async (req: Request, res: Response) => {};
