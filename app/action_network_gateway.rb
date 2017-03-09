require 'uri'
require 'net/http'

class ActionNetworkGateway
  ENDPOINT = URI('https://actionnetwork.org/api/v2/event_campaigns/bd077f2f-280d-49d2-b675-e8156ee3d856/events')

  def self.marches
    request = Net::HTTP::Get.new(ENDPOINT)
    request['OSDI-API-Token'] = ENV['ACTION_NETWORK_KEY']
    response = Net::HTTP.start(ENDPOINT.hostname, ENDPOINT.port, use_ssl: true) { |http| http.request(request) }
    JSON.parse(response.body)
  end
end