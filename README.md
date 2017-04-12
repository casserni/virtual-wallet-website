# README
CTrader

![Build Status](https://codeship.com/projects/2d766f40-ed76-0134-1a2d-62023c06a575/status?branch=master)
![Code Climate](https://codeclimate.com/github/casserni/CurrencyExchanger.png)
![Coverage Status](https://coveralls.io/repos/casserni/CurrencyExchanger/badge.png)

CTrader is a React-based currency trading simulator. The application uses a background worker once a day to fetch from an API populated with the most recent exchange rates from the Central European Bank. Users can use the conversion form to compare two different currencies and a line graph will update with data from the last week on the exchange rates between the two selected currencies. Users can also build multiple portfolios that monitor the currencies they currently own, trade between currencies, and see their potential profits.

Nick Cassera

Heroku link: https://ctrader.herokuapp.com/

* Features:

  Ability to sign up, sign in, sign out As a user you can
    - Create a Portfolio
    - Simulate depositing funds
    - Trade to other currencies
    - Delete Portfolios
    - Tab through all portfolios without full page reloads
    - See percentage increase as well as a calculated value

  All users can
    - User the conversion form
    - See an interactive line graph of historical database
    - Switch to view the current exchange rate between 30+ different currencies

* Technologies incorporated:
  - Ruby version 2.3.3 (Rails framework)
  - React for the front end
  - Foundation for styling
  - Devise for user interaction
  - SQL and ActiveRecord for database maintenance
  - Chartjs for graphing
  - API integration (through fetch requests)
  - Heroku Scheduler
  - RSpec/Capybara for testing suite
  - Github for collaboration
  - Heroku for deployment
