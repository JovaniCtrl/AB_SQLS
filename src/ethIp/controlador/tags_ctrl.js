import moment from "moment/moment.js";
import { getConnectinon } from "../database/connection.js";
import sql from "mssql";
import "moment";

export const insertData = async (state) => {
  const pool = await getConnectinon();
  const currentDate = new Date()
  const end = currentDate.toISOString().slice(0, 19).replace("T", " ");
  console.log(end)

  try {
    const pre = await pool
      .request()
      .query(
        `SELECT TOP 1 endDate FROM test_RuningEvent ORDER BY startDate DESC `
      );
    const start = pre.recordset
      .pop()
      .endDate.toISOString()
      .slice(0, 19)
      .replace("T", " ");
        console.log(start)


    const momStart = moment(start);
    const momEnd = moment(end);
    const duration = momStart.diff(momEnd, "minutes");
    //  console.log(duration);

    var st = 3;
    if (state == "true") st = 1;
    else st = 0 

    console.log(st);
    const result = await pool
      .request()
      .input("st", sql.Int, st)
      .input("end", sql.DateTime, end)
      .input("start", sql.DateTime, start)
      .input("dur", sql.VarChar, duration.toString())
      .query(
        "INSERT INTO test_RuningEvent (state, startDate,endDate, duration) VALUES (@st,@start,@end, @dur)"
      );
  } catch (error) {
    console.log(error);
  }
};
