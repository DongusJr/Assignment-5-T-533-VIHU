import React from "react";
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import { rest } from "msw"
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import Home from "../pages/index";

// Good starting point: https://testing-library.com/docs/react-testing-library/example-intro

// TODO setup your mock api here
const server = setupServer(
  rest.get("/api/list", (req, res, ctx) => {
    return res(ctx.json({title: "Test the program 🧪"}));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("📝 TODO app", () => {
  // TODO Add your react-testing-library tests here
  it('should display loading if response is not correct', async () => {
    server.use(
      rest.get('/api/list', (req, res, ctx) => {
        return res(ctx.json(null))
      }),
    )
      
    render(<Home />);

    await waitFor(() => screen.getByTestId("loading"));

    expect(screen.getByTestId("loading")).toBeDefined()
  })
});
