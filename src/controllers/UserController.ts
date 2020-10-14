import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

class UserController {

  async me(req: Request, res: Response) {
    const userRepo = getRepository(User);
    /**
     * Check if the user does exist
     */
    const user = await userRepo.findOne({ where: { id: req.userId } });
    /** 
     * Redundant but if middleware fails 
     */
    if (!user) {
      return res.sendStatus(401).send({ error: "Are you logged in?" })
    }
    const { email, name, role } = user;
    return res.send({ email, name, role });
  }

}

export default new UserController();