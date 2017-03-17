require 'net/http'
require 'json'
class HomeController < ApplicationController
  def index
    url = 'https://api.fixer.io/latest?base=USD'
    uri = URI(url)
    response = Net::HTTP.get(uri)
    @currency_collection = JSON.parse(response)["rates"].keys
    @currency_collection.push(JSON.parse(response)["base"])
  end
end
