import nodepccc from 'nodepccc';
var conn = new nodepccc;
var doneReading = false;
var doneWriting = false;
var preVal = false;

const intervalID = setInterval(connected, 500);

conn.initiateConnection({port: 44818, host: '192.168.100.27'}, intervalID);

function connected(err) {
	if (typeof(err) !== "undefined") {
		console.log(err);
		process.exit();
	}
	conn.setTranslationCB(tagLookup);
	conn.addItems('VarBool');
	conn.readAllItems(valuesReady);	
}

function valuesReady(anythingBad, values) {
	if (anythingBad) { console.log("SOMETHING WENT WRONG READING VALUES!!!!"); }
    if (preVal != values.VarBool)  {
        preVal = values.VarBool 
        console.log(values.VarBool)
    } 

	doneReading = true;
	if (doneWriting) { process.exit(); }
}

function tagLookup(tag) {
	switch (tag) {
	case 'VarBool':
		return 'B3:0/0';				//Bool
	default:
		return undefined;
	}
}