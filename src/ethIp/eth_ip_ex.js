import nodepccc from "nodepccc";
var conn = new nodepccc();
var doneReading = false;
var doneWriting = false;
var preVal = false;

const intervalID = setInterval(connected, 500);

conn.initiateConnection({ port: 44818, host: "192.168.100.27" }, intervalID);

function connected(err) {
  if (typeof err !== "undefined") {
    console.log(err);
    process.exit();
  }
  conn.setTranslationCB(tagLookup);
  conn.addItems(["Var1", "Var2", "Var3"]);
  conn.readAllItems(valuesReady);
}

function valuesReady(anythingBad, values) {
  if (anythingBad) {
    console.log("SOMETHING WENT WRONG READING VALUES!!!!");
  }
  if (values.Var1 && values.Var2 && values.Var3 ) {
    console.log("Insert Data!");
  }
  console.log(values);
  doneReading = true;
  if (doneWriting) {
    process.exit();
  }
}

function tagLookup(tag) {
  switch (tag) {
    case "Var1":
      return "B3:0/0"; //Bool
    case "Var2":
      return "B3:0/2";
    case "Var3":
      return "B3:0/4";
    default:
      return undefined;
  }
}
