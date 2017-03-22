require 'sinatra/base'
require 'sinatra/asset_pipeline'
require 'sinatra/activerecord'
require 'json'
require File.expand_path '../app/models/zip_code.rb', __FILE__
require File.expand_path '../app/models/marches.rb', __FILE__

class App < Sinatra::Base
  register Sinatra::AssetPipeline
  register Sinatra::ActiveRecordExtension

  HEADERS = { 'Content-Type' => 'application/json', 'Access-Control-Allow-Origin' => '*' }

  get '/' do
    erb :index
  end

  get '/marches' do
    begin
      halt 200, HEADERS, Marches.all.to_json
    rescue
      halt 500, HEADERS, ''
    end
  end

  get '/zip_codes/:zip_code' do
    row = ZipCode.find_by_zip_code(params[:zip_code])
    if row
      halt 200, HEADERS, row.to_json
    else
      halt 404, HEADERS, ''
    end
  end
end
