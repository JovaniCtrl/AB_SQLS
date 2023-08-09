import { Tag, Controller, TagGroup } from "ethernet-ip";
import { insertData } from "./controlador/tags_ctrl.js";

const PLC = new Controller();
const PLC_Tags = new TagGroup();

PLC_Tags.add(new Tag("BOTON", "MainProgram"));
PLC_Tags.add(new Tag("F_1", "MainProgram"));
//PLC.subscribe() */

//PLC.subscribe(PLC_Tags);

PLC.subscribe(new Tag("BOTON", "MainProgram"));
PLC.subscribe(new Tag("F_1", "MainProgram"));

export function selladora() {
  PLC.connect("192.168.100.101", 0).then(async () => {
    PLC.scan_rate = 50;
    PLC.scan();
  });
}

async function RG_Tags() {
  await PLC.readTagGroup(PLC_Tags);
  PLC_Tags.forEach((tag) => {
   var txt = {
      name: tag.name,
      value: tag.value
    }
    console.table(txt);
  });
}

PLC.forEach((tag) => {
  tag.on("Initialized", (tag) => {
    console.log("Initialized", tag.name, " = ",tag.value);
    //insertData(tag.value.toString());
  });

  tag.on("Changed", (tag, oldValue) => {
    console.log(tag.name, "Changed to:", tag.value);
    RG_Tags();
    //insertData(tag.value.toString());
  });
});

selladora();
