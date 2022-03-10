import React from "react";
import {render, fireEvent, waitFor, screen, waitForElementToBeRemoved} from '@testing-library/react';
import { rest } from "msw"
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import Home from "../pages/index";
import { act } from "react-dom/test-utils";

// Good starting point: https://testing-library.com/docs/react-testing-library/example-intro

// TODO setup your mock api here
const newTodo = "Add a new Todo to the Todo list ✔"

const server = setupServer(
  // For initial call to the backend for todos to list
  rest.get("/api/list", (req, res, ctx) => {
    return res(ctx.json([{id: "1", title: "Test the program 🧪"}]));
  }),
  // When the input field has been submitted
  rest.post("api/add", (req, res, ctx) => {
    return res(ctx.json({id: "2", title: newTodo}));
  }),
  // When the user clicks on a todo item
  rest.delete("api/remove", (req, res, ctx) => {
    return res(ctx.text("204"))
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("📝 TODO app", () => {
  // TODO Add your react-testing-library tests here
  it('should display loading if response is not correct', async () => {
    // Generate an invalid response
    server.use(
      rest.get('/api/list', (req, res, ctx) => {
        return res(ctx.json(null)) // Not valid response
      }),
    )
      
    render(<Home />);
    
    // Wait for the loading element
    await waitFor(() => screen.getByTestId("loading"));

    // Check if the loading div is in the document
    expect(screen.getByTestId("loading")).toBeInTheDocument()
  })

  it('should have a single todo item when component is loaded', async () => {
    render(<Home />);
    // Wait for the get /api/list
    await waitFor(() => screen.getByTestId("todo-item"))
  
    // Check if the todo item is to be seen
    expect(screen.getAllByTestId("todo-item")).toHaveLength(1);
    expect(screen.getByTestId("todo-item")).toHaveTextContent("Test the program 🧪")
  });

  it('should add a new todo item on todo-input submit', async () => {
    render(<Home />);
    // Wait for api/list
    await waitFor(() => screen.getByTestId("todo-item"))

    // Input should initially be empty
    expect(screen.getByTestId("todo-input")).toHaveValue("");

    // Submit a new todo that is not ""
    fireEvent.change(screen.getByTestId("todo-input"), {target: {value: newTodo}})    
    fireEvent.submit(screen.getByTestId("todo-input"))

    // On submit should clear the field
    expect(screen.getByTestId("todo-input")).toHaveValue("")

    // Check if the new item has been added
    await waitFor(() => expect(screen.getAllByTestId("todo-item")).toHaveLength(2))
    expect(screen.getAllByTestId("todo-item").slice(-1)[0]).toHaveTextContent("Something else we did not expect")

  });

  it('should remove an item when clicked on', async () => {
    render(<Home />);
    // Wait for api/list
    await waitFor(() => screen.getByTestId("todo-item"))

    // save the item
    let todoItem = screen.getByTestId("todo-item")
    // Remove it by clicking on it
    fireEvent.click(todoItem)
    // Wait for it to be removed
    await waitForElementToBeRemoved(todoItem).catch(err => console.log(err),)
    // Check that it is removed
    expect(todoItem).not.toBeInTheDocument()

  });
})