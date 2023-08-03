import moment from "moment/moment.js";
import { getConnectinon } from "../database/connection.js";
import "moment";

export const getTags = async (req, res) => {
  const pool = await getConnectinon();
  const result = await pool.request().query("SELECT * FROM testTableDate");
  console.log(result);
  res.json(result);
};

export const insertData = async (req, res) => {
   const {state}= req.body
   console.log(state)
  /* const pool = await getConnectinon();
  const currentDate = new Date();
  const end = currentDate.toISOString().slice(0, 19).replace("T", " ");
  try {
    const pre = await pool
      .request()
      .query(
        `SELECT TOP 1 endDate FROM testTableDate ORDER BY startDate DESC `
      );
    const start = pre.recordset
      .pop()
      .endDate.toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const momStart = moment(start);
    const momEnd = moment(end);
    const duration = momStart.diff(momEnd, "minutes");
    console.log(momStart);
    console.log(momEnd);
    console.log(duration);
    const result = await pool
      .request()
      .query(
        `INSERT INTO testTableDate (startDate,endDate) VALUES ('${start}','${end}' )`
      );
    //console.log(result)
    res.json(result);
  } catch (error) {
    console.log(error);
    const result = await pool
      .request()
      .query(`INSERT INTO testTableDate (endDate) VALUES ('${end}' )`);
    //console.log(result)
    res.json(result);
  } */
  res.json(state);
};
