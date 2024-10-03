import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { productProviders } from './product';
import { DatabaseModule } from 'src/database/database.module';
import { FileModule } from 'src/file/file.module';
import { FileService } from 'src/file/file.service';

@Module({
  imports:[DatabaseModule,FileModule],
  providers: [ProductService, ...productProviders,FileService],
  controllers: [ProductController],
})
export class ProductModule {}
