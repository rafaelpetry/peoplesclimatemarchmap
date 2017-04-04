Install OS packages
-------------------
* Install Homebrew
  * This is the de facto standard package manager for Mac OS X.
  * Instructions available at http://brew.sh/
* Install Git
  * We use Git for version control.
  * Run: `brew install git`
* Install RVM
  * RVM allows you to run multiple versions of Ruby.
  * Instructions available at https://rvm.io/
* Install Ruby
  * Run: `rvm install 2.2.5`
  * If you already have RVM installed and it does not have that version of Ruby, upgrade with `rvm get stable`
* Install Postgres
  * Run: `brew install postgresql`

Clone the repository
--------------------
* Run: `git clone git@github.com:rafaelpetry/peoplesclimatemarchmap.git`
* `cd` into the project directory so RVM can detect your Ruby version and create a Gemset for the project.
  * Use `rvm info` to check if everything is set up correctly.

Install RubyGems
----------------
* Install Foreman
  * We use foreman to start all different processes with a single command.
  * Run: `gem install foreman`
* Install Bundler
  * We use Bundler to manage project dependencies.
  * Run: `gem install bundler`
* Install all other project gems
  * Run: `bundle install`

Create the Database
-------------------
* To Create a local Postgres database
  * Start postgres: `brew services start postgresql`
  * Run: `rake db:create`, `rake db:migrate`, `rake db:populate`, `rake db:cache`
  * To populate the heroku database run `heroku run bundle exec rake db:populate` then `heroku run bundle exec rake db:cache`

* If you can't run `rake db:cache` locally, try uncommenting these two lines in `Rakefile`:
```ruby
#Uncomment these two lines to use .env file locally
#Don't commit these to heroku
require 'dotenv'
Dotenv.load
```

Create the .env file
--------------------
* Create a file named `.env` at the root of the repo, with the following contents:
```
ACTION_NETWORK_KEY=_paste_key_here_
PORT=5000
SITE_URL=http://localhost:5000/
```
Replace the `ACTION_NETWORK_KEY` with the real key.

Working with the application
----------------------------
* Start the application
  * Run: `foreman start`
  * Connect to http://localhost:5000/
