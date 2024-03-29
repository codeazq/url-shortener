import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ShortLinkModule } from './shortLink/shortLink.module';
import { IdentityModule } from './identity/identity.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { EmailModule } from './services/email/email.module';

@Module({
  imports: [
    PrismaModule,
    ShortLinkModule,
    IdentityModule,
    AnalyticsModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
