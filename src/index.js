import app from "./app.js";
import {selladora} from "./ethIp/eth_ip.js"


app.listen(app.get('port'));
selladora()

console.log("Server en el puerto",app.get('port'));
