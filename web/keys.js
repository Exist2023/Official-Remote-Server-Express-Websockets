// WebSocket Connection
const socket = new WebSocket('wss://326b0777-7ba5-4127-9b8e-2d367e490248-00-3974p7fcnkhze.janeway.replit.dev/api/ws/keys');


// Pressed down keys
let keys = [];

// Special Keys - special unknown keys replaced to work on windows
let specialKeys = {
  "arrowup": "up",
  "arrowdown": "down",
  "arrowleft": "left",
  "arrowright": "right",
};



// Key down (pressed)
document.addEventListener('keydown', function(event) {
  // Get key down
  let key = event.key.toString().toLowerCase();
  console.log("Key Down: " + key);

  // Replace key in case of special key
  key = replaceSpecialKeys(key);

  // Send key down to SERVER
  socket.send('down ' + key);
})

// Key Up (released))
document.addEventListener('keyup', function(event) {
  // Get key up
  let key = event.key.toString().toLowerCase();
  console.log("Key Up: " + key);

  // Replace key in case of special key
  key = replaceSpecialKeys(key);

  // Send key up to SERVER
  socket.send('up ' + key);
})



// Replace special keys - to be understood on windows
function replaceSpecialKeys(key) {
  // Check if sent key is a special key to be replaced
  if (specialKeys.hasOwnProperty(key)) {
    const replacedKey = specialKeys[key];
    return replacedKey;
  } else {
    return key;
  }
}