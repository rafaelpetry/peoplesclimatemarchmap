require 'uri'
require 'net/http'
require 'json'

class ActionNetworkGateway
  ENDPOINT = 'https://actionnetwork.org/api/v2/event_campaigns/bd077f2f-280d-49d2-b675-e8156ee3d856/events'
  RETURN_FIELDS = %w(title description location start_date browser_url)

  def self.marches
    fetch_page(ENDPOINT)
  end

  private

  def self.fetch_page(page_url)
    page_uri = URI(page_url)
    request = Net::HTTP::Get.new(page_uri)
    request['OSDI-API-Token'] = ENV['ACTION_NETWORK_KEY']
    response = Net::HTTP.start(page_uri.hostname, page_uri.port, use_ssl: true) { |http| http.request(request) }
    body = JSON.parse(response.body)
    events = body['_embedded']['osdi:events']

    next_url = body['_links']['next']['href'] rescue nil
    events += fetch_page(next_url) if next_url

    events.map do |event|
      event.select { |k,v| RETURN_FIELDS.include?(k) }
    end
  end
end