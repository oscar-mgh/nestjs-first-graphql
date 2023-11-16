import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';
import { AggregationsType } from './types/aggregations.type';

@Resolver(() => Todo)
export class TodoResolver {
	constructor(private readonly todoService: TodoService) {}

	@Query(() => [Todo], { name: 'todos' }) //? @ArgsType StatusArgs
	findAll(@Args() statusArgs: StatusArgs): Todo[] {
		return this.todoService.findAll(statusArgs);
	}

	@Query(() => Todo, { name: 'todo' })
	findById(@Args('id', { type: () => Int }) id: number): Todo {
		return this.todoService.findById(id);
	}

	@Mutation(() => Todo)
	createTodo(
		@Args('createTodoInput') createTodoInput: CreateTodoInput
	): Todo {
		return this.todoService.create(createTodoInput);
	}

	@Mutation(() => Todo)
	updateTodo(
		@Args('updateTodoInput') updateTodoInput: UpdateTodoInput
	): Todo {
		return this.todoService.update(updateTodoInput);
	}

	@Mutation(() => Boolean)
	deleteTodo(@Args('id', { type: () => Int }) id: number): boolean {
		return this.todoService.delete(id);
	}

	// Agregations
	@Query(() => Int)
	totalTodos(): number {
		return this.todoService.totalTodos;
	}

	@Query(() => Int)
	completedTodos(): number {
		return this.todoService.completedTodos;
	}

	@Query(() => Int)
	pendingTodos(): number {
		return this.todoService.pendingTodos;
	}

	@Query(() => AggregationsType) //? @ObjectType AggregationsType
	aggegations(): AggregationsType {
		return {
			completed: this.todoService.completedTodos,
			pending: this.todoService.pendingTodos,
			total: this.todoService.totalTodos,
		};
	}
}
