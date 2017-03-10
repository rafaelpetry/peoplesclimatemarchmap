require 'sinatra/base'
require 'sinatra/asset_pipeline'
require 'json'
require File.expand_path '../app/action_network_gateway.rb', __FILE__

class App < Sinatra::Base
  register Sinatra::AssetPipeline

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