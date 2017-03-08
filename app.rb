require 'sinatra/base'
require 'sinatra/asset_pipeline'

class App < Sinatra::Base
  register Sinatra::AssetPipeline

  get '/' do
    erb :index
  end
end
