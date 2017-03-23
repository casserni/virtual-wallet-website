require 'json'

class Api::V1::DaysController < ApplicationController
  def index
    render json: Day.all, include:['exchange_rates']
  end
end
