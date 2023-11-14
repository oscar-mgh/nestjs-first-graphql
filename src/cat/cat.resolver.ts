import { Resolver, Query, Args } from '@nestjs/graphql';

@Resolver()
export class CatResolver {
  @Query(() => String, { description: 'greetings', name: 'firstQuery' })
  salutations(): string {
    return 'NestJS - GraphQL - Hello World!';
  }

  @Query(() => Number, {
    description: 'Get a random number between 0 and 100',
    name: 'random',
  })
  randomNumber(): number {
    return Math.round(Math.random() * 101);
  }

  @Query(() => Number, {
    description: 'Get a random number between min and max parameters',
    name: 'generateRandom',
  })
  generateRandomBetween(
    @Args('min') min: number,
    @Args('max') max: number,
  ): number {
    return Math.round(Math.random() * max - min + 1);
  }
}
