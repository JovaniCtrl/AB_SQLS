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
/*   const pool = await sql.connect(dbSettings);
  const result = await pool.request().query('SELECT * FROM TestTable');
  console.log(result); */

  try{
    const pool = await sql.connect(dbSettings)
    return pool;
  } catch(error){
    console.log(err)
  }
}

