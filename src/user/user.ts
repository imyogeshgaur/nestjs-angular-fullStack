import { Connection } from 'mongoose';
import { userSchema } from './user.entity';

export const userProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model("User", userSchema),
    inject: ['DB_CONNECTION']
  },
];