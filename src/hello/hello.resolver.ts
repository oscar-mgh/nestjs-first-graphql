import { Resolver, Query, Args, Int } from '@nestjs/graphql';

@Resolver()
export class HelloResolver {
	@Query(() => String, { description: 'greetings', name: 'firstQuery' })
	salutations(): string {
		return 'NestJS - GraphQL - Hello World!';
	}

	@Query(() => Number, {
		description: 'Get a random number between 0 and 10',
		name: 'random',
	})
	randomNumber(): number {
		return Math.round(Math.random() * 11);
	}

	@Query(() => Number, {
		description: 'Get a random number between min and max parameters',
		name: 'generateRandom',
	})
	generateRandomBetween(
		@Args('min', { name: 'minNum', type: () => Int }) min: number,
		@Args('max', { name: 'maxNum', type: () => Int }) max: number
	): number {
		return Math.round(Math.random() * max - min + 1);
	}
}
