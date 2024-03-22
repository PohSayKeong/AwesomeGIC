# Bank Account

You're designing a simple banking system that handles operations on bank accounts. At the moment, your system is capable of three features:
- depositing an amount
- withdrawing an amount
- printing account statement

User input and output can be from command line.

When account is created, its balance is 0.

When launching the application, it prompts user for actions:
```
Welcome to AwesomeGIC Bank! What would you like to do?
[D]eposit
[W]ithdraw
[P]rint statement
[Q]uit
```

User should be able to enter `D` or `d` to select Deposit option. Similarly, initial character is used for other options.

## Deposit
Upon selecting Deposit option, application prompts user for amount.
```
Please enter the amount to deposit:
```

User is then able to enter:
```
500
```

Then system responds with:
```
Thank you. $500.00 has been deposited to your account.
Is there anything else you'd like to do?
[D]eposit
[W]ithdraw
[P]rint statement
[Q]uit
```

## Withdraw
User can choose to withdraw by entering `W`/`w`.
```
w
```

System then responds with:
```
Please enter the amount to withdraw:
```

User is able to enter:
```
100
```

Then system responds with:
```
Thank you. $100.00 has been withdrawn.
Is there anything else you'd like to do?
[D]eposit
[W]ithdraw
[P]rint statement
[Q]uit
```
You can ignore where the withdrawn amount goes for now.

## Print Statement
When user chooses to print statement, user enters
```
p
```

System then responds with:
```
Date                  | Amount  | Balance
8 Jul 2022 11:12:30AM | 500.00  | 500.00
8 Jul 2022 11:14:15AM | -100.00 | 400.00
```

## Quit
When user chooses to quit, user enters:
```
q
```

System responds with:
```
Thank you for banking with AwesomeGIC Bank.
Have a nice day!
```
