require 'net/http'
require 'json'

class Api::V1::CurrenciesController < ApplicationController
  def index
    url = "https://api.fixer.io/latest?base=USD"
    uri = URI(url)
    response = Net::HTTP.get(uri)
    render json: JSON.parse(response)
  end
end
