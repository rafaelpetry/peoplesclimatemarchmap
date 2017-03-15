require 'sinatra/base'
require 'sinatra/asset_pipeline'
require 'sinatra/activerecord'
require 'json'
require File.expand_path '../app/action_network_gateway.rb', __FILE__

class App < Sinatra::Base
  register Sinatra::AssetPipeline
  register Sinatra::ActiveRecordExtension

  set :database, ENV['DATABASE_URL']

  get '/' do
    erb :index
  end

  get '/marches' do
    begin
      halt 200, {'Content-Type' => 'application/json'}, ActionNetworkGateway.marches.to_json
    rescue
      halt 500, {'Content-Type' => 'application/json'}, ''
    end
  end
end