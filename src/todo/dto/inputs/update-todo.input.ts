import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, MaxLength, IsInt, Min, IsOptional } from 'class-validator';

@InputType()
export class UpdateTodoInput {
	@Field(() => Int)
	@IsInt()
	@Min(1)
	id: number;

	@Field(() => String, { description: 'What needs to be done', nullable: true })
	@IsString()
	@IsNotEmpty()
	@MaxLength(25)
	@IsOptional()
	description?: string;

	@Field(() => Boolean, { description: 'Is it done yet?', nullable: true })
	@IsOptional()
	done?: boolean;
}
