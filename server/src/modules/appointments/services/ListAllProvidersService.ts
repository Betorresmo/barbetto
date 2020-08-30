import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  user_id: string;
}

@injectable()
class ListAllProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async run({ user_id }: IRequest): Promise<User[]> {
    const providersInCache = await this.cacheProvider.retrieve<User[]>(
      `providers-list:${user_id}`,
    );
    if (providersInCache) {
      return providersInCache;
    }

    const providers = await this.usersRepository.findAll({
      except_user_id: user_id,
    });

    await this.cacheProvider.store(`providers-list:${user_id}`, providers);

    return providers;
  }
}

export default ListAllProvidersService;
