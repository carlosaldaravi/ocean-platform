import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';
import { Configuration } from '../config/config.keys';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      console.log('process.env.HOST: ', process.env.HOST);
      console.log('process.env.PORT: ', process.env.PORT);
      console.log('process.env.DATABASE: ', process.env.DATABASE);
      console.log('process.env.USERNAME: ', process.env.USERNAME);
      console.log('process.env.PASSWORD: ', process.env.PASSWORD);

      return {
        // ssl: true,
        type: 'postgres' as 'postgres',
        host: process.env.HOST || config.get(Configuration.HOST),
        port: process.env.PORT || 5444,
        database: process.env.DATABASE || config.get(Configuration.DATABASE),
        username: process.env.USERNAME || config.get(Configuration.USERNAME),
        password: process.env.PASSWORD || config.get(Configuration.PASSWORD),
        synchronize: false,
        logging: true,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/{.ts,.js}'],
      } as ConnectionOptions;
    },
  }),
];
