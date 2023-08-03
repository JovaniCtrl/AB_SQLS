import {Tag, Controller} from 'ethernet-ip'


const PLC = new Controller();

PLC.subscribe(new Tag("Motor", "MainProgram")); // Program Scope Tag in PLC Program "prog"
 
PLC.connect("192.168.100.101", 0).then(() => {
    PLC.scan_rate = 50;
    PLC.scan();
});
 
// Catch the Tag "Changed" and "Initialized" Events
PLC.forEach(tag => {
    // Called on the First Successful Read from the Controller
    tag.on("Initialized", tag => {
        console.log("Initialized", tag.value);
    });
 
    // Called if Tag.controller_value changes
    tag.on("Changed", (tag, oldValue) => {
        
        console.log(tag.name)
        console.log("Changed:", tag.value);
        
    });
});