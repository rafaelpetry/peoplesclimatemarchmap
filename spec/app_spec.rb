require File.expand_path '../spec_helper.rb', __FILE__

describe 'App' do
  describe 'GET /' do
    it "returns a successful response" do
      get '/'
      expect(last_response).to be_ok
    end
  end

  describe 'GET /marches' do
    let(:marches) { [{'title' => 'March'}] }

    it "returns marches as JSON" do
      expect(ActionNetworkGateway).to receive(:marches).and_return(marches)

      get '/marches'

      expect(last_response).to be_ok
      expect(last_response.body).to eq(marches.to_json)
    end

    it "returns marches as JSON" do
      expect(ActionNetworkGateway).to receive(:marches).and_raise

      get '/marches'

      expect(last_response).not_to be_ok
      expect(last_response.body).to be_empty
    end
  end

end