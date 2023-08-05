import { Tag, Controller } from "ethernet-ip";
import { insertData } from "./controlador/tags_ctrl.js";

const PLC = new Controller();

PLC.subscribe(new Tag("BOTON", "MainProgram"));

export function selladora() {
  PLC.connect("192.168.100.101", 0).then(async () => {
    PLC.scan_rate = 50;
    PLC.scan();
  });
}

PLC.forEach(tag => {

  tag.on("Initialized", tag => {
      console.log("Initialized", tag.value);
      insertData(tag.value.toString());
  });

  tag.on("Changed", (tag, oldValue) => {
      
      console.log(tag.name)
      console.log("Changed:", tag.value);
      insertData(tag.value.toString());
      
  });
});