import { Connection } from 'mongoose';
import { productSchema } from './product.entity';

export const productProviders = [
  {
    provide: 'PRODUCT_MODDEL',
    useFactory: (connection: Connection) => connection.model("Product", productSchema),
    inject: ['DB_CONNECTION']
  },
];