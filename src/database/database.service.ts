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
      return {
        // ssl: true,
        type: 'postgres' as 'postgres',
        host: process.env.HOST || config.get(Configuration.HOST),
        port: 5432,
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
