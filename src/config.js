const questions = [
  {
    type: 'input',
    name: 'componentName',
    message: 'What is the name of the hardware component?',
    validate: input => input ? true : 'Component name cannot be empty.'
  },
  {
    type: 'input',
    name: 'componentDescription',
    message: 'Provide a brief description of the hardware component:',
    validate: input => input ? true : 'Component description cannot be empty.'
  },
  {
    type: 'input',
    name: 'numberOfPins',
    message: 'How many pins does the component have?',
    validate: input => {
      const num = parseInt(input);
      return !isNaN(num) && num > 0 ? true : 'Number of pins must be a positive number.';
    },
    filter: input => parseInt(input)
  },
  {
    type: 'confirm',
    name: 'requiresPower',
    message: 'Does the component require a power supply?',
    default: false
  },
  {
    type: 'input',
    name: 'operatingVoltage',
    message: 'What is the operating voltage of the component?',
    when: answers => answers.requiresPower,
    validate: input => {
      const voltage = parseFloat(input);
      return !isNaN(voltage) && voltage > 0 ? true : 'Operating voltage must be a positive number.';
    },
    filter: input => parseFloat(input)
  },
  {
    type: 'input',
    name: 'additionalNotes',
    message: 'Any additional notes or special requirements for the component?',
    default: ''
  }
];

module.exports = {
  questions
};
