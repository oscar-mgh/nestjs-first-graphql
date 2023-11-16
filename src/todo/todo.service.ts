import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput, UpdateTodoInput, StatusArgs } from './dto';

@Injectable()
export class TodoService {
	private todos: Todo[] = [
		{ id: 1, description: 'Get Mind Stone', done: true },
		{ id: 2, description: 'Get Power Stone', done: true },
		{ id: 3, description: 'Get Reality Stone', done: false },
		{ id: 4, description: 'Get Soul Stone', done: false },
		{ id: 5, description: 'Get Space Stone', done: false },
		{ id: 6, description: 'Get Time Stone', done: false },
	];

	get totalTodos(): number {
		return this.todos.length;
	}

	get completedTodos(): number {
		return this.todos.filter(todo => todo.done).length;
	}

	get pendingTodos(): number {
		const pendingTodos = this.todos.filter(todo => !todo.done).length;
		return pendingTodos;
	}

	findAll(statusArgs?: StatusArgs): Todo[] {
		const { status } = statusArgs;
		if (status !== undefined)
			return this.todos.filter(todo => todo.done === status);
		return this.todos;
	}

	findById(id: number): Todo {
		const todo = this.todos.find(todo => todo.id === id);
		if (!todo)
			throw new NotFoundException(
				`Todo id ['${id}'] could not be found in the database`
			);
		return todo;
	}

	create(createTodoInput: CreateTodoInput): Todo {
		const todo = new Todo();
		todo.description = createTodoInput.description;
		todo.done = false;
		todo.id = Math.max(...this.todos.map(todo => todo.id), 0) + 1;
		this.todos.push(todo);
		return todo;
	}

	update({ id, description, done }: UpdateTodoInput): Todo {
		const todoToUpdate = this.findById(id);
		if (description) todoToUpdate.description = description;
		if (done !== undefined) todoToUpdate.done = done;
		this.todos = this.todos.map(todo => {
			return todo.id === id ? todoToUpdate : todo;
		});
		return todoToUpdate;
	}

	delete(id: number): boolean {
		const todoToDelete = this.findById(id);
		this.todos = this.todos.filter(todo => todo.id !== id);
		return true;
	}
}
