import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({
      user_id,
    });

    return response.status(200).json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, new_password } = request.body;
    const user_id = request.user.id;

    const updateProfile = container.resolve(UpdateProfileService);

    const updatedUser = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      new_password,
    });

    return response.status(201).json(classToClass(updatedUser));
  }
}

export default ProfileController;
