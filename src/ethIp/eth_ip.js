import { Tag, Controller, TagGroup } from "ethernet-ip";
import { insertData } from "./controlador/tags_ctrl.js";

var txt = new Set()

const PLC = new Controller();
const PLC_Tags = new TagGroup();

const BotonTag = new Tag("BOTON", "MainProgram")
const F1Tag = new Tag("F_1", "MainProgram")
const F2Tag = new Tag("F_2", "MainProgram")

PLC_Tags.add(BotonTag);
PLC_Tags.add(F1Tag);
PLC_Tags.add(F2Tag);

PLC.subscribe(BotonTag);
PLC.subscribe(F1Tag);
PLC.subscribe(F2Tag);

export function selladora() {
  PLC.connect("192.168.100.101", 0).then(async () => {
    PLC.scan_rate = 50;
    PLC.scan();
  });
}

async function RG_Tags() {
  await PLC.readTagGroup(PLC_Tags);
  
  PLC_Tags.forEach((tag) => {
  txt.add({
    name: tag.name,
    value: tag.value
  })  
  });
  console.log(txt)
  
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
