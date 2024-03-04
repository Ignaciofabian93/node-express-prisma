import prisma from "../prisma-client/client";
import { Request, Response } from "express";
import { compare, genSalt, hash } from "bcrypt";
import { sign } from "jsonwebtoken";

const serverError = "Service error";

const secret = process.env.JWT_SECRET as string;

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!user) return res.status(404).json({ error: "User not found" });

    const checkPass = await compare(password, user.password);
    if (!checkPass) return res.status(404).json({ error: "Wrong password" });
    const token = sign({ id: user.id }, secret, {
      expiresIn: "1d",
    });
    return res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: serverError });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: serverError });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    if (!user) return res.status(404).json({ error: "User not created" });
    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: serverError });
  }
};
