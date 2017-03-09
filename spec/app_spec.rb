require File.expand_path '../spec_helper.rb', __FILE__

describe 'App' do
  describe 'GET /' do
    it "returns a successful response" do
      get '/'
      expect(last_response).to be_ok
    end
  end
end