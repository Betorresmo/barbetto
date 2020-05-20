import { getRepository } from 'typeorm';
import fs from 'fs';
import path from 'path';

import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async run({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);
    if (!user) {
      throw new AppError('Only authenticated users can update avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const avatarExists = fs.promises.stat(userAvatarFilePath);

      if (avatarExists) {
        fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
