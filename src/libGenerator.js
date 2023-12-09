const fs = require('fs');
const path = require('path');

/**
 * Generates a KiCAD library part definition based on the provided answers.
 * @param {Object} answers - The answers object containing the component specifications.
 * @returns {string} The generated KiCAD library part definition.
 */
function libGenerator(answers) {
  const {
    componentName,
    componentDescription,
    numberOfPins,
    requiresPower,
    operatingVoltage,
    additionalNotes
  } = answers;

  // Start building the KiCAD part definition
  let libContent = `EESchema-LIBRARY Version 2.4\n#encoding utf-8\n`;
  libContent += `#\n# ${componentName}\n#\n`;
  libContent += `DEF ${componentName} U 0 40 Y Y 1 F N\n`;
  libContent += `F0 "U" 0 0 60 H V C CNN\n`; // Reference
  libContent += `F1 "${componentName}" 0 0 60 H V C CNN\n`; // Value
  libContent += `F2 "" 0 0 60 H I C CNN\n`; // Footprint
  libContent += `F3 "" 0 0 60 H I C CNN\n`; // Datasheet
  libContent += `F4 "${componentDescription}" 0 0 60 H I C CNN "Description"\n`; // Description
  if (additionalNotes) {
    libContent += `F5 "${additionalNotes}" 0 0 60 H I C CNN "Notes"\n`; // Additional Notes
  }
  libContent += `$FPLIST\n`;
  libContent += ` *\n`;
  libContent += `$ENDFPLIST\n`;
  libContent += `DRAW\n`;

  // Add pins to the part definition
  for (let i = 1; i <= numberOfPins; i++) {
    libContent += `X ~ ${i} 0 ${-100 * i} 150 R 50 50 1 1 I\n`; // Pin
  }

  // If the component requires power, add power pins
  if (requiresPower) {
    libContent += `X VCC 99 100 0 150 U 50 50 1 1 W\n`; // Power pin VCC
    libContent += `X GND 100 -100 0 150 D 50 50 1 1 W\n`; // Power pin GND
  }

  libContent += `ENDDRAW\n`;
  libContent += `ENDDEF\n`;
  libContent += `#\n#End Library\n`;

  return libContent;
}

module.exports = libGenerator;
