const fs = require("fs");
const prompt = require("prompt-sync")();

class BankAccount {
    constructor() {
        this.balance = 0;
        this.transactions = [];
        this.filename = "bank_records.json"; // Default filename for saving and reading records
        this.loadFromFile(); // Load transactions from file on startup
    }

    deposit(amount) {
        this.balance += amount;
        this.transactions.push({
            date: formatDate(new Date()),
            amount: amount,
            balance: this.balance,
        });
        this.saveToFile();
    }

    withdraw(amount) {
        if (amount > this.balance) {
            return false;
        }
        this.balance -= amount;
        this.transactions.push({
            date: formatDate(new Date()),
            amount: -amount,
            balance: this.balance,
        });
        this.saveToFile();
        return true;
    }

    printStatement() {
        if (this.transactions.length === 0) {
            console.log("No transactions to display.");
            return;
        }
        console.log("Date\t\t\t| Amount\t| Balance");
        for (const transaction of this.transactions) {
            console.log(
                `${transaction.date}\t| ${transaction.amount.toFixed(
                    2
                )}\t| ${transaction.balance.toFixed(2)}`
            );
        }
    }

    saveToFile() {
        const data = JSON.stringify(this.transactions, null, 2);
        fs.writeFileSync(this.filename, data);
    }

    loadFromFile() {
        try {
            const data = fs.readFileSync(this.filename, "utf8");
            this.transactions = JSON.parse(data);
            // get the balance stored in the last transaction
            this.balance =
                this.transactions[this.transactions.length - 1].balance;
        } catch (err) {
            console.error(`Error reading file: ${err.message}`);
        }
    }
}

function promptAction() {
    console.log("[D]eposit");
    console.log("[W]ithdraw");
    console.log("[P]rint statement");
    console.log("[Q]uit");
}

function main() {
    const account = new BankAccount();
    console.log("Welcome to AwesomeGIC Bank! What would you like to do?");

    while (true) {
        promptAction();
        const action = prompt("Enter your choice: ").toUpperCase();
        switch (action) {
            case "D":
                const depositAmount = getAmount(
                    "Please enter the amount to deposit: "
                );
                if (!handleInvalidAmount(depositAmount)) continue;
                account.deposit(depositAmount);
                console.log(
                    `Thank you. $${depositAmount} has been deposited to your account.`
                );
                console.log("Is there anything else you'd like to do?");
                break;
            case "W":
                const withdrawAmount = getAmount(
                    "Please enter the amount to withdraw: "
                );
                if (!handleInvalidAmount(withdrawAmount)) continue;
                const sucess = account.withdraw(withdrawAmount);
                if (sucess) {
                    console.log(
                        `Thank you. $${withdrawAmount} has been withdrawn.`
                    );
                } else {
                    console.log("Insufficient funds.");
                }
                console.log("Is there anything else you'd like to do?");
                break;
            case "P":
                account.printStatement();
                console.log("Is there anything else you'd like to do?");
                break;
            case "Q":
                console.log("Thank you for banking with AwesomeGIC Bank.");
                console.log("Have a nice day!");
                return;
            default:
                console.log("Invalid choice. Please try again.");
        }
    }
}

// helper functions

/**
 * Formats a date object to a string in the format "DD-MMM-YYYY HH:MM:SS".
 * @param {Date} date The date object to format.
 * @returns {string} The formatted date string.
 */
function formatDate(date) {
    const options = {
        day: "numeric",
        month: "short",
        year: "numeric",
    };
    const dateString = date.toLocaleDateString("en-SG", options);
    const timeString = date.toLocaleTimeString("en-SG");
    return `${dateString} ${timeString}`;
}

/**
 * Prompts the user for an amount and returns it.
 * @param {string} message The message to display to the user.
 * @returns {number} The amount entered by the user.
 */
function getAmount(message) {
    const amount = parseFloat(parseFloat(prompt(message)).toFixed(2));
    return amount;
}

function handleInvalidAmount(amount) {
    if (isNaN(amount)) {
        console.log("Invalid amount. Please try again.");
        return false;
    }
    return true;
}

main();
