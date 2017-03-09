require File.expand_path '../spec_helper.rb', __FILE__
require File.expand_path '../../app/action_network_gateway.rb', __FILE__

describe ActionNetworkGateway do
  describe '.marches' do
    let(:request) { {} }
    let(:http) { double }
    let(:response) { { 'key' => 'value' } }

    it 'fetches marches from ActionNetwork' do
      expect(Net::HTTP::Get).to receive(:new).with(ActionNetworkGateway::ENDPOINT).and_return(request)
      expect(Net::HTTP).to receive(:start).and_yield(http)
      expect(http).to receive(:request).with(request).and_return(double(body: response.to_json))

      expect(ActionNetworkGateway.marches).to eq(response)
      expect(request).to have_key('OSDI-API-Token')
    end
  end
end