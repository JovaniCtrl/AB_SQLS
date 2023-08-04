import { getConnectinon } from "../database/connection.js";
import sql from "mssql";

export const insertData = async (state) => {
  const pool = await getConnectinon();

  try {
    const oldData = await pool
      .request()
      .query(
        `SELECT TOP 1 state,endDate FROM test_RuningEvent ORDER BY startDate DESC `
      );
    const pre = oldData.recordset.pop();
    const start = pre.endDate.toISOString().slice(0, 19).replace("T", " ");

    const preState = Number(pre.state);
    
     const diff = await pool.request().query(`WITH tabx(stx,etx) AS (
        SELECT (SELECT TOP 1 endDate FROM test_RuningEvent ORDER BY startDate DESC) AS startDate, CURRENT_TIMESTAMP AS endDate)  SELECT DATEDIFF(MINUTE, stx, etx) AS difference FROM tabx
        `);
    const duration = diff.recordset.pop().difference;
    //console.log(duration);

    var st = 3;
    if (state == "true") st = 1;
    else st = 0;
    
    if(preState !=  st){
      const result = await pool
      .request()
      .input("st", sql.Int, st)
      .input("start", start)
      .input("dur", sql.VarChar, duration.toString())
      .query(
        "INSERT INTO test_RuningEvent (state, startDate, duration) VALUES (@st,@start, @dur)"
      );

    console.log("New Register Ok")
    }
    
  } catch (error) {
    console.log(error);
    console.log("New Register NG");
  }
};


