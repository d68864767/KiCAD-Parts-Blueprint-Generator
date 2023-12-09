const inquirer = require('inquirer');
const libGenerator = require('./libGenerator');
const patentCheck = require('./patentCheck');
const config = require('./config');

async function main() {
  try {
    // Start the interactive prompt
    console.log('Welcome to the KiCAD Parts Blueprint Generator!');
    const answers = await inquirer.prompt(config.questions);

    // Check if the part potentially infringes on existing patents
    const isPatentSafe = await patentCheck(answers);
    if (!isPatentSafe) {
      console.error('The proposed hardware component may infringe on existing patents.');
      return;
    }

    // Generate the KiCAD parts (.lib) file
    const libContent = libGenerator(answers);
    if (libContent) {
      console.log('Successfully generated the KiCAD parts (.lib) file.');
      // Here you would typically write the libContent to a file, but for simplicity, we'll just log it
      console.log(libContent);
    } else {
      console.error('Failed to generate the KiCAD parts (.lib) file.');
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

main();
