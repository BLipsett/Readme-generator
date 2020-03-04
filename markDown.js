function generateReadMe(answers) {
    return `
    ## Generated ReadMe

    ## ${answers.email}
    ## ${answers.title}
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