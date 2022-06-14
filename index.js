const inquirer = require('inquirer');
const fs = require('fs');

let employeeList = [];

class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }
    
    getName = () => {
            return this.name
    }

    getRole = () => {
            return 'Employee'
    }   
}

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getRole = () => {
        return 'Manager'
    }
}

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }

    getRole = () => {
        return 'Engineer'
    }

    getGithub = () => {
        return `http://github.com/${this.github}`
    }
}

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }

    getRole = () => {
        return 'Intern'
    }

    getSchool = () => {
        return `${this.school}`
    }
}

// inquirer prompt for team manager
// answers => this.name = new manager
// prompt again with new choices for manager intern engineer
// option in prompt to end loop
// write file html referencing created classes

managerInfo = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Input Team Manager\'s name',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Input Team Manager\'s ID number',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Input Team Manager\'s email',
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Input Team Manager\'s office number',
        },
    ])
    .then((answers) => {
        let manager = new Manager(`${answers.name}`, `${answers.id}`, `${answers.email}`, `${answers.officeNumber}`)
        employeeList.push(manager)
        console.log(employeeList)
        employeeType()
    })
}

employeeType = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeType',
            message: 'Add a new employee?',
            choices: ['Engineer', 'Intern', 'Employee', 'Quit']
        }
    ])
    .then((answers) => {
        if (answers.employeeType === 'Engineer') {
            engineerQuestions()
        } else if (answers.employeeType === 'Intern') {
            internQuestions()
        } else if (answers.employeeType === 'Employee') {
            employeeQuestions()
        } else {
            quit()
        }
    })    
}

engineerQuestions = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Input Engineer\'s name',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Input Engineer\'s ID number',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Input Engineer\'s email',
        },
        {
            type: 'input',
            name: 'github',
            message: 'Input Engineer\'s github username',
        },
    ])
    .then((answers) => {
        let engineer = new Engineer(`${answers.name}`, `${answers.id}`, `${answers.email}`, `${answers.github}`)
        employeeList.push(engineer)
        console.log(employeeList)
        employeeType()
    })
}

internQuestions = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Input Intern\'s name',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Input Intern\'s ID number',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Input Intern\'s email',
        },
        {
            type: 'input',
            name: 'school',
            message: 'Input the name of Intern\'s school',
        },
    ])
    .then((answers) => {
        let intern = new Intern(`${answers.name}`, `${answers.id}`, `${answers.email}`, `${answers.school}`)
        employeeList.push(manager)
        console.log(employeeList)
        employeeType()
    })
}

employeeQuestions = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Input Employee\'s name',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Input Employee\'s ID number',
        },
        {
            type: 'input',
            name: 'email',
            message: 'Input Employee\'s email',
        },
    ])
    .then((answers) => {
        let employee = new Employee(`${answers.name}`, `${answers.id}`, `${answers.email}`)
        employeeList.push(manager)
        console.log(employeeList)
        employeeType()
    })
}

quit = () => {
    fs.writeFile('index.html',
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        
    <header>
        <h1>My cheamm</h1>
    </header>
    
    <main>
        
    </main>
    
    </body>
    </html>`,
    (err) =>
    err ? console.error(err) : console.log('it worked!')
    );
}


managerInfo();

// create html file
// tests