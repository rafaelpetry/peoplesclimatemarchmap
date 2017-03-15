require 'sinatra/base'
require 'sinatra/asset_pipeline'
require 'sinatra/activerecord'
require 'json'
require File.expand_path '../app/action_network_gateway.rb', __FILE__
require File.expand_path '../app/models/zip_code.rb', __FILE__

class App < Sinatra::Base
  register Sinatra::AssetPipeline
  register Sinatra::ActiveRecordExtension

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

  get '/zip_codes/:zip_code' do
    row = ZipCode.find_by_zip_code(params[:zip_code])
    if row
      halt 200, {'Content-Type' => 'application/json'}, row.to_json
    else
      halt 404, {'Content-Type' => 'application/json'}, ''
    end
  end
end