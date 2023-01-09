const { ServeStaticModule } = require('@nestjs/serve-static');
const { Module } = require('@nestjs/common');
const { join } = require('path');

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
