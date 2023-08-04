
import { getConnectinon } from "../database/connection.js";

export const getTags = async (req, res) => {
  const pool = await getConnectinon();
  const result = await pool.request().query("SELECT * FROM test_RuningEvent");
  console.log(result);
  res.json(result);
};