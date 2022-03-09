import Head from "next/head";
import styles from "../styles/Home.module.css";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { Todo } from "../lib/todoStore";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  let changeHandler = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setTodo(event.target.value);
  };

  let addTodo = async (event: { preventDefault: () => void }) => {
    if (todo.length === 0) {
      return;
    }

    setTodo("");
    event.preventDefault();
    const { data } = await axios.post("/api/add", { title: todo });

    setTodos([...todos, data]);
  };

  let removeTodo = async (rtodo: Todo) => {
    await axios.delete(`/api/remove?id=${rtodo.id}`);

    const filteredData = todos.filter((d) => d.id !== rtodo.id);
    setTodos(filteredData);
  };

  let loadTodos = async () => {
    const { data } = await axios.get("/api/list");
    setTodos(data);
  };

  if (!todos) {
    return <div data-testid="loading">Loading...</div>;
  }

  return (
    <div className={styles.container} data-testid="application">
      <Head>
        <title>A5 - TODO</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍🏫</text></svg>"
        />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <h1 className={styles.title}>
            TODO 📃 App with{" "}
            <a href="https://blog.upstash.com/nextjs-todo">Next.js!</a>
            <br />
            <br />
          </h1>

          <form className={styles.cardForm} onSubmit={addTodo}>
            <input
              value={todo}
              data-testid="todo-input"
              className={styles.cardInput}
              type="text"
              name="todo"
              onChange={changeHandler}
              placeholder="What are you going to TODO?"
            />
          </form>

          {todos.map((item) => (
            <a
              data-testid="todo-item"
              key={item.id}
              href="#"
              onClick={() => removeTodo(item)}
              className={styles.card}
            >
              <p>{item.title}</p>
            </a>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://blog.upstash.com/nextjs-todo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by 👩‍🏫
        </a>
      </footer>
    </div>
  );
}
