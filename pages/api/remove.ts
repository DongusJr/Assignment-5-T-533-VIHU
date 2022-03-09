import type { NextApiRequest, NextApiResponse } from "next";
import { removeTodo } from "../../lib/todoStore";

export default async function remove(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.id) {
    return res.status(400).send("Id parameter required.");
  }

  await removeTodo(req.query.id.toString());

  return res.send(204);
}
