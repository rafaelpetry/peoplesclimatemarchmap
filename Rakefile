require "sprockets"
require "sinatra/activerecord/rake"

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
end