const mysql = require("mysql");
const inquirer = require("inquirer");

const employeeData = await inquirer.prompt([
  {
    type: "list",
    message: "Would you like to bid or add item",
    choices: ["Email", "Home Phone", "Cell Phone", "Text"],
    name: "communication"
  }]);

  switch(employeeData.role) { // switch by the role (Manager or Engineer or Intern)
      case "Manager":
          const managerData = await inquirer.prompt(questions.manager);
          const manager = new Manager(employeeData.name, id, `${employeeData.name.replace(/\s/g, "")}@abc.com`, managerData.officeNumber);
          employeeCards += managerCard(manager);
          break;
      case "Engineer":
          const engineerData = await inquirer.prompt(questions.engineer);
          const engineer = new Engineer(employeeData.name, id, `${employeeData.name.replace(/\s/g, "")}@abc.com`, engineerData.github);
          employeeCards += engineerCard(engineer);
          break;
      case "Intern":
          const internData = await inquirer.prompt(questions.intern);
          const intern = new Intern(employeeData.name, id, `${employeeData.name.replace(/\s/g, "")}@abc.com`, internData.school);
          employeeCards += internCard(intern);
          break;
  }

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "greatBay_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  createProduct();
});

function createProduct() {
  console.log("Inserting a new product...\n");
  const query = connection.query(
    "INSERT INTO products SET ?",
    {
      flavor: "Rocky Road",
      price: 3.0,
      quantity: 50
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      updateProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function updateProduct() {
  console.log("Updating all Rocky Road quantities...\n");
  const query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        quantity: 100
      },
      {
        flavor: "Rocky Road"
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      deleteProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function deleteProduct() {
  console.log("Deleting all strawberry icecream...\n");
  connection.query(
    "DELETE FROM products WHERE ?",
    {
      flavor: "strawberry"
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products deleted!\n");
      // Call readProducts AFTER the DELETE completes
      readProducts();
    }
  );
}

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}
