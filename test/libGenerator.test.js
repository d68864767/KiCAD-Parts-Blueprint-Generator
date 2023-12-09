const libGenerator = require('../src/libGenerator');
const { describe, it } = require('mocha');
const { expect } = require('chai');

describe('libGenerator', function() {
  it('should generate a valid KiCAD part definition', function() {
    const answers = {
      componentName: 'TestComponent',
      componentDescription: 'A test component for validation',
      numberOfPins: 4,
      requiresPower: true,
      operatingVoltage: '5V',
      additionalNotes: 'Test note'
    };

    const generatedLib = libGenerator(answers);
    const lines = generatedLib.split('\n');

    expect(lines).to.include.members([
      'EESchema-LIBRARY Version 2.4',
      '#encoding utf-8',
      `# ${answers.componentName}`,
      `DEF ${answers.componentName} U 0 40 Y Y 1 F N`,
      `F0 "U" 0 0 60 H V C CNN`,
      `F1 "${answers.componentName}" 0 0 60 H V C CNN`,
      `F4 "${answers.componentDescription}" 0 0 60 H I C CNN "Description"`,
      `F5 "${answers.additionalNotes}" 0 0 60 H I C CNN "Notes"`,
      'DRAW',
      'ENDDRAW',
      'ENDDEF',
      '#\n#End Library'
    ]);

    // Check for the correct number of pins
    const pinLines = lines.filter(line => line.startsWith('X ~'));
    expect(pinLines).to.have.lengthOf(answers.numberOfPins);

    // Check for power pins if required
    if (answers.requiresPower) {
      expect(lines).to.include.members([
        'X VCC 99 100 0 150 U 50 50 1 1 W',
        'X GND 100 -100 0 150 D 50 50 1 1 W'
      ]);
    }
  });

  it('should not include power pins if not required', function() {
    const answers = {
      componentName: 'TestComponentNoPower',
      componentDescription: 'A test component without power pins',
      numberOfPins: 2,
      requiresPower: false,
      operatingVoltage: 'N/A',
      additionalNotes: 'No power required'
    };

    const generatedLib = libGenerator(answers);
    const lines = generatedLib.split('\n');

    expect(lines).to.not.include.members([
      'X VCC 99 100 0 150 U 50 50 1 1 W',
      'X GND 100 -100 0 150 D 50 50 1 1 W'
    ]);
  });
});
