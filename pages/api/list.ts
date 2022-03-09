import type { NextApiRequest, NextApiResponse } from "next";
import { getTodos, Todo } from "../../lib/todoStore";

export default async function list(
  req: NextApiRequest,
  res: NextApiResponse<Todo[]>
) {
  return res.json(await getTodos());
}
