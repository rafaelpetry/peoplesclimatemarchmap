require File.expand_path '../spec_helper.rb', __FILE__
require File.expand_path '../../app/action_network_gateway.rb', __FILE__

describe ActionNetworkGateway do
  describe '.marches' do
    let(:request) { {} }
    let(:http) { double }
    let(:event) { { 'title' => 'March!' } }

    context 'with only one page' do
      let(:response) { { '_embedded' => { 'osdi:events' => [event] } } }

      it 'fetches marches from ActionNetwork' do
        expect(Net::HTTP::Get).to receive(:new).with(URI(ActionNetworkGateway::ENDPOINT)).and_return(request)
        expect(Net::HTTP).to receive(:start).and_yield(http)
        expect(http).to receive(:request).with(request).and_return(double(body: response.to_json))

        expect(ActionNetworkGateway.marches).to eq([event])
        expect(request).to have_key('OSDI-API-Token')
      end
    end

    context 'with multiple pages' do
      let(:first_request) { {} }
      let(:second_request) { {} }
      let(:first_response) do
        {
          '_embedded' => { 'osdi:events' => [event] },
          '_links' => { 'next' => { 'href' => second_page_url } }
        }
      end
      let(:second_response) { { '_embedded' => { 'osdi:events' => [event] } } }
      let(:second_page_url) { 'http://site.com/marches?page=2' }

      it 'fetches following pages if they exist' do
        allow(Net::HTTP).to receive(:start).and_yield(http)

        expect(Net::HTTP::Get).to receive(:new).with(URI(ActionNetworkGateway::ENDPOINT)).and_return(first_request)
        expect(http).to receive(:request).with(first_request).and_return(double(body: first_response.to_json))

        expect(Net::HTTP::Get).to receive(:new).with(URI(second_page_url)).and_return(second_request)
        expect(http).to receive(:request).with(second_request).and_return(double(body: second_response.to_json))

        expect(ActionNetworkGateway.marches).to eq([event, event])
        expect(first_request).to have_key('OSDI-API-Token')
        expect(second_request).to have_key('OSDI-API-Token')
      end
    end
  end
end