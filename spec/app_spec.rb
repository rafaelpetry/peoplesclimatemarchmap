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

  describe 'GET /zip_codes' do
    let(:zip_code) { ZipCode.new(zip_code: '10016', latitude: 40.745224, longitude: -73.978297) }

    it 'returns zip code coordinates as JSON' do
      expect(ZipCode).to receive(:find_by_zip_code).with('10016').and_return(zip_code)

      get '/zip_codes/10016'

      expect(last_response).to be_ok
      expect(last_response.body).to eq(zip_code.to_json)
    end

    it 'to fail for non-existent zip code' do
      expect(ZipCode).to receive(:find_by_zip_code).with('10017').and_return(nil)

      get '/zip_codes/10017'

      expect(last_response).not_to be_ok
      expect(last_response.body).to be_empty
    end
  end
end