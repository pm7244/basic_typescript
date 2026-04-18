import { Request, Response } from "express";
import { User } from "../model/userModel";

export const renderUsersPage = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ status: 1 }).sort({ createdAt: -1 });

    res.render("pages/users", {
      title: "Users",
      users
    });
  } catch (error: any) {
    res.status(500).send("Server Error: " + error.message);
  }
};