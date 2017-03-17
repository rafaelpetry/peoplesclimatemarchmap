require "sprockets"
require "sinatra/activerecord/rake"
require "csv"
require File.expand_path '../app/models/zip_code', __FILE__

assets = Sprockets::Environment.new
assets.append_path "assets"

task :assets do
  assets["application.js"].write_to "public/assets/application.js"
  assets["application.css"].write_to "public/assets/application.css"
  assets["embed.js"].write_to "public/assets/embed.js"
end

namespace :db do
  task :load_config do
    require "./app"
  end

  task :populate => [:load_config] do
    ZipCode.transaction do
      ZipCode.delete_all
      CSV.foreach('db/zipcodes.csv', headers: true) do |row|
        ZipCode.create(zip_code: row['ZIP'], latitude: row['LAT'], longitude: row['LNG'])
      end
    end
  end
end

begin
  require 'rspec/core/rake_task'
  RSpec::Core::RakeTask.new(:spec => ['db:schema:load'])
rescue LoadError
end
