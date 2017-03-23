require 'json'

class Api::V1::ExchangeRatesController < ApplicationController
  def index
    render json: ExchangeRate.all
  end
end
