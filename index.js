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
    ]).then(function (answers) {
        const queryUrl = `https://api.github.com/users/${answers.username}`;


        axios.get(queryUrl).then(function (res) {
            const response = res.data;
            const profPic = res.data.avatar_url;
            //console.log(res)


            fs.writeFile("repos.txt", response, function (err) {
                if (err) {
                    throw err;
                }

            });

            const readMe = generateReadMe(answers);
            const seeImg = generateImage(profPic);
            writeFileAsync("README.md", readMe, seeImg);


        });

        //const repoNamesStr = repoNames.join("\n");


    });
}
function generateReadMe(answers) {
    return `
## Generated ReadMe

## Info
+ ${answers.username}

+ ${answers.email}

+ ${answers.title}

+ ${answers.description}
    
Here are the instrucions for installation.
    
+ ${answers.install}
    
+ ${answers.table}
## 💡 Hits
`;
}

function generateImage(profPic) {
    return `
    ![GitHub Profile](/${profPic})
Format: ![Alt Text](${profPic})`;
}

promptUser();

