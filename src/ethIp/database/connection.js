
import sql from "mssql";

const dbSettings = {
  user: "sa",
  password: "1502",
  server: "localhost",
  database: "Ctrl_Test",
  options: {
    encrypt: true, 
    trustServerCertificate: true,
  },
};


export async function getConnectinon() {
  try{
    const pool = await sql.connect(dbSettings)
    return pool;
  } catch(error){
    console.log(err)
  }
}
