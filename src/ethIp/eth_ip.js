import { Tag, Controller } from "ethernet-ip";
import { insertData } from "./controlador/tags_ctrl.js";

const PLC = new Controller();

PLC.subscribe(new Tag("Motor", "MainProgram"));

export function selladora() {
  PLC.connect("192.168.100.101", 0).then(async () => {
    PLC.scan_rate = 50;
    PLC.scan();
  });
}

PLC.forEach(tag => {
  // Called on the First Successful Read from the Controller
  tag.on("Initialized", tag => {
      console.log("Initialized", tag.value);
      insertData(tag.value.toString());
  });

  // Called if Tag.controller_value changes
  tag.on("Changed", (tag, oldValue) => {
      
      console.log(tag.name)
      console.log("Changed:", tag.value);
      insertData(tag.value.toString());
      
  });
});