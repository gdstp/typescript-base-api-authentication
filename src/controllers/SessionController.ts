import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as yup from 'yup';
import jwt from 'jsonwebtoken';

import User from '../models/User';

class SessionController {

  async register(req: Request, res: Response) {
    const userRepo = getRepository(User);

    const schema = yup.object().shape({
      email: yup.string().email().required(),
      name: yup.string().required(),
      password: yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const { email, name, password } = req.body;
    /**
     * Check if the email is registered
     */
    const alreadyExists = await userRepo.findOne({ where: { email } });
    if (alreadyExists) {
      return res.status(400).send({ error: "E-mail already registered" });
    }

    const user = userRepo.create({ email, name, password });
    userRepo.save(user);

    return res.send({ success: "User created" });

  }

  async login(req: Request, res: Response) {
    const userRepo = getRepository(User);

    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const { email, password } = req.body;
    /**
     * Check if the email is registered
     */
    const user = await userRepo.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({ error: "Authentication failed!" });
    }
    /**
     * Compare the hashed password with the string provided by the user
     */
    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ error: "Authentication failed!" });
    }

    const { id, name, role } = user;
    return res.send({
      id, email, name, role, token: jwt.sign({ id, role }, process.env.JWT_TOKEN || 'secret', {
        expiresIn: process.env.JWT_DURATION || '7d'
      })
    })
  }

}

export default new SessionController();