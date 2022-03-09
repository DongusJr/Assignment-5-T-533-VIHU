import {prisma} from "./prisma";

export interface Todo {
  id: string;
  title: string;
}

export async function addTodo(title: string): Promise<Todo> {
  await prisma.$connect();
  const todo = await prisma.todo.create({
    data: {
      title,
    },
  });
  return todo;
}

export async function removeTodo(todoId: string): Promise<void> {
  await prisma.$connect();
  await prisma.todo.delete({ where: { id: todoId } });
}

export async function getTodos(): Promise<Todo[]> {
  await prisma.$connect();
  return await prisma.todo.findMany();
}
