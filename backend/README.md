<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

Prisma service
The onModuleInit is optional — if you leave it out, Prisma will connect lazily on its first call to the database. We don't bother with onModuleDestroy, since Prisma has its own shutdown hooks where it will destroy the connection. For more info on enableShutdownHooks, please see Issues with enableShutdownHooks

Prisma interferes with NestJS enableShutdownHooks. Prisma listens for shutdown signals and will call process.exit() before your application shutdown hooks fire. To deal with this, you would need to add a listener for Prisma beforeExit event.
