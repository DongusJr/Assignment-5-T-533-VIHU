import { addTodo, Todo } from "../../lib/todoStore";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function add(
  req: NextApiRequest,
  res: NextApiResponse<Todo>
) {
  const { title } = req.body;
  const response = await addTodo(title);

  return res.status(200).json(response);
}
