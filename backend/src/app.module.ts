import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ShortLinkModule } from './shortLink/shortLink.module';
import { IdentityModule } from './identity/identity.module';

@Module({
  imports: [PrismaModule, ShortLinkModule, IdentityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
