import { Request, Response } from "express";
import { comparePasswords } from "../../utils/password";
import { searchUserByEmail } from "../../utils/search";
import jwt from "jsonwebtoken";
import { jwtToken } from "../../constant";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

export const login = async (
  req: Request<{}, {}, LoginSchemaType>,
  res: Response
) => {
  try {
    const { email, password } = LoginSchema.parse(req.body);

    const user = await searchUserByEmail(email);

    if (!user) {
      return res.status(401).json({ tokenUser: null, isPasswordValid: false });
    }

    const isPasswordValid = await comparePasswords(password, user.password || "");

    if (!isPasswordValid) {
      return res.status(401).json({ tokenUser: null, isPasswordValid });
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
    };

    jwt.sign(
      tokenPayload,
      jwtToken,
      { expiresIn: "7d" },
      (err, tokenUser) => {
        if (err) {
          console.error("Erreur lors de la génération du token :", err);
          return res
            .status(500)
            .json({ message: "Erreur lors de la génération du token" });
        }
        res.status(200).json({ tokenUser, isPasswordValid });
      }
    );
  } catch (error: any) {
    console.error("Erreur lors de l'authentification :", error.errors);
    res
      .status(400)
      .json({ message: "Validation failed", errors: error.errors });
  }
};
