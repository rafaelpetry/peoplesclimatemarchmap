require 'sinatra/base'
require 'sinatra/asset_pipeline'

class App < Sinatra::Base
  register Sinatra::AssetPipeline

  get '/' do
    erb :index
  end

  get '/marches' do
    halt 200, {'Content-Type' => 'application/json'}, '{"key":"value"}'
  end
end
