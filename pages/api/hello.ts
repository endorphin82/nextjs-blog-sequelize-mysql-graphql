import { NextApiRequest, NextApiResponse } from "next"

// Try accessing it at http://localhost:3001/api/hello. You should see {"text":"Hello"}.
export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ text: "Hello" })
}