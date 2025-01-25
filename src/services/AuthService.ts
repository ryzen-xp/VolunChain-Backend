import jwt from 'jsonwebtoken';
import { User } from '../entities/User';
import AppDataSource from '../config/ormconfig';

const SECRET_KEY = process.env.JWT_SECRET || 'defaultSecret';

class AuthService {
  static async authenticate(walletAddress: string): Promise<string> {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { walletAddress } });

    if (!user) {
      throw new Error('User not found');
    }

    return jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  }
}

export default AuthService;