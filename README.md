React on Rails CapitalFlows
===================

Small application from scratch to keep track of our expenses; each record will consist of a date, a title and an amount. A record will be treated as Credit if its amount is greater than zero, otherwise it will be treated as Debit.

Summarizing, the application will behave as follows:

* When the user creates a new record through the horizontal form, it will be appended to the records table
* The user will be able to inline-edit any existing record
* Clicking on any Delete button will remove the associated record from the table
* Adding, editing or removing an existing record will update the amount boxes at the top of the page

----------

### Discover React on Rails CapitalFlows

##### CapitalFlows

![alt text](https://pbs.twimg.com/media/C_Rn3YPXoAAiiO_.jpg:large)

### Installation

Things you might want to cover:

Rails

```
gem 'rails', '~> 5.0.0', '>= 5.0.0.1'
```

Ruby

```
ruby 2.3.1p112 
```

##### System dependencies

```
gem 'react-rails'
```

1) Run bundle install from the command line.

```
bundle install
```

##### Database creation

```rake db:migrate```

##### Database initialization

```rake db:seed```

##### Rails Server

```rails s```

#### Enjoy!