import { join } from 'path';
import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { GraphQLModule } from '@nestjs/graphql';
import { HelloModule } from './hello/hello.module';
import { TodoModule } from './todo/todo.module';

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: false,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			plugins: [ApolloServerPluginLandingPageLocalDefault()],
		}),
		HelloModule,
		TodoModule,
	],
})
export class AppModule {}
