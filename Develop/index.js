const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");
const renderLicenseBadge = generateMarkdown.renderLicenseBadge;
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
function init() {
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
    //need to make this destructured 
    .then((answers) => {
      const readmeData = {
        title: answers.title,
        description: answers.description,
        installation: answers.installation,
        usage: answers.usage,
        contribution: answers.contribution,
        test: answers.test,
        license: answers.license,
        author: {
          name: answers.name,
          username: answers.username,
          email: answers.email,
        },
      };
      const licenseBadge = generateMarkdown.renderLicenseBadge(readmeData.license);
      const licenseSection = generateMarkdown.renderLicenseSection(readmeData.license, readmeData.author.username,currentYear);
      const readmeContents = `
      # ${readmeData.title}
      
      ## Description
      
      ${readmeData.description}

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
      
      ${readmeData.installation}
      
      ## Usage
      
      ${readmeData.usage}
      
      ## Contributing
      
      ${readmeData.contribution}
      
      ## Tests
      
      ${readmeData.test}
      
      ## License
      
      ${readmeData.license}  

      ${licenseSection}
      
      ## Questions
      
      For questions, please contact ${readmeData.author.name} at ${readmeData.author.email} or visit their [GitHub profile](https://github.com/${readmeData.author.username}).
      
      `.replace(/^\s+/gm, '');
      writeToFile(readmeContents);
      console.log("Generated README data:", readmeData);
    })
    .catch((error) => {
      console.log("There was an error:", error);
    });
}

// Function call to initialize app
init();
