var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: "", 
    database: "Bamazon"
});

var start = function() {
	console.log("Bamazon Executive Window\n");
	inquirer.prompt([
		{
			type: "list",
			message: "Please Select an Option",
			name: "choice",
			choices: ["View Product Sales by Department", "Create New Department"]
		}
	]).then(function(answers) {
		switch(answers.choice) {
			case "View Product Sales by Department":
				connection.query("SELECT * FROM Departments", function(err, res) {
					console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n");
					console.log("DepartmentID  |     DepartmentName     |  OverHeadCosts  |  ProductSales  |  TotalProfit");
					console.log("----------------------------------------------------------------------------------------");
					res.forEach(function(dep) {
						console.log("       " + dep.DepartmentID + "      | " + dep.DepartmentName + "             |  " + dep.OverHeadCosts + "          " + dep.TotalSales + "          " + (parseInt(dep.TotalSales) - parseInt(dep.OverHeadCosts)));
					})
				})
				break;
		}
	})
}

start();