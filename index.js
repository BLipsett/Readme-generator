const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "What is your Github username?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address?"
        },
        {
            type: "input",
            name: "title",
            message: "What is the title of your project?"
        },
        {
            type: "input",
            name: "description",
            message: "Describe your project"
        },
        {
            type: "input",
            name: "install",
            message: "How do you install your project"
        },
        {
            type: "input",
            name: "table",
            message: "What will be your table of contents?"
        },
        {
            type: "input",
            name: "usage",
            message: "Instructions and examples of your projects use?"
        },
        {
            type: "input",
            name: "contributers",
            message: "Who were the contributers on this project?"
        },
        {
            type: "list",
            name: "licenses",
            message: "What licenses does your project have?",
            choices: ["MIT", "Apache", "GPL", "None"]
        },
        {
            type: "input",
            name: "tests",
            message: "Write tests and provide examples to run them"
        }
    ]).then(function ({ username }) {
        const queryUrl = `https://api.github.com/users/${username}/repo?per_page=100`;
        

        axios.get(queryUrl).then(function (res) {
            const repoNames = res.data.map(function (repo) {
                return repo.name;
            });

            const repoNamesStr = repoNames.join("\n");

            fs.writeFile("repos.txt", repoNamesStr, function (err) {
                if (err) {
                    throw err;
                }

                console.log(`Saved ${repoNames.length} repos`);
            });
        });
    });
}

function generateReadMe(answers) {
    return `
    ## Generated ReadMe

    * ${answers.email}
    * ${answers.title}
    * ${answers.description}
    * Here are the instrucions for installation.
    * ${answers.install}
    * ${answers.table}
    ## 💡 Hints
    
    * Take a look at the API response from the GitHub API to get an idea of how the data is structured. Example: <https://api.github.com/users/fabpot/repos?per_page=100>.
    
      * Avoid continually refreshing this page since there's a limit for non-authenticated requests to the GitHub API.
    
    clear
    `;
}

promptUser()
    .then(function (answers) {
        const readMe = generateReadMe(answers);

        return writeFileAsync("README.md", readMe);
    })
    .then(function () {
        console.log("Successfully wrote to README.md");
    })
    .catch(function (err) {
        console.log(err);
    });