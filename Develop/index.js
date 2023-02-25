const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");
const renderLicenseBadgeLink = generateMarkdown.renderLicenseBadgeLink;
const renderLicenseSection = generateMarkdown.renderLicenseSection;
const dayjs = require('dayjs');
const currentYear = dayjs().year();

// Function writes the README file
function writeToFile(data) {
  fs.writeFile("README.md", data,{ encoding: "utf8", flag: "w", mode: 0o666, filetype: "markdown" }, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("README.md created successfully!");
    }
  });
}

// TODO: Create a function to initialize app
function generateMd() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is your project title?",
      },
      {
        type: "input",
        name: "description",
        message: "Enter a project description",
      },
      {
        type: "input",
        name: "installation",
        message: "Enter installation instructions",
      },
      {
        type: "input",
        name: "usage",
        message: "Enter usage information",
      },
      {
        type: "input",
        name: "contribution",
        message: "Enter contribution guidelines",
      },
      {
        type: "input",
        name: "test",
        message: "Enter test instructions",
      },
      {
        type: "list",
        name: "license",
        message: "Choose a license for your application",
        choices: ["MIT", "Apache", "GPL", "Unlicensed"],
      },
      {
        type: "input",
        name: "name",
        message: "What is your name?",
      },
      {
        type: "input",
        name: "username",
        message: "What is your Github username?",
      },
      {
        type: "input",
        name: "email",
        message: "What is your email address?",
      },
    ])
    .then((answers) => {
      const {title, description, installation, usage, contribution, test, license, name, username, email} = answers;
      const licenseBadge = generateMarkdown.renderLicenseBadgeLink(license);
      const licenseSection = generateMarkdown.renderLicenseSection(license, username, currentYear);
      const readmeContents = `
      # ${title}
      
      ## Description
      
      ${description}

      ##
      ${licenseBadge}

      ## Table of Contents
      - [Installation](#installation)
      - [Usage](#usage)
      - [Contributing](#contributing)
      - [Tests](#tests)
      - [License](#license)
      - [Questions](#questions)
      
      ## Installation
      
      ${installation}
      
      ## Usage
      
      ${usage}
      
      ## Contributing
      
      ${contribution}
      
      ## Tests
      
      ${test}
      
      ## License
      
      ${license}  

      ${licenseSection}
      
      ## Questions
      
      For questions, please contact ${name} at ${email} or visit their [GitHub profile](https://github.com/${username}).
      
      `.replace(/^\s+/gm, '');
      writeToFile(readmeContents);
      console.log("Generated README data:", answers);
    })
    .catch((error) => {
      console.log("There was an error:", error);
    });
}

// Function call to initialize app
generateMd();
