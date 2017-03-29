require "rails_helper"

RSpec.describe Api::V1::DaysController, type: :controller do
  describe "GET #index" do
    let!(:day1) { FactoryGirl.create(:day) }
    let!(:day2) { FactoryGirl.create(:day) }
    let!(:exchange_rate1) { FactoryGirl.create(:exchange_rate, day: day1) }
    let!(:exchange_rate2) { FactoryGirl.create(:exchange_rate, day: day2) }

    it "should return all exchange rates" do
      get :index
      expect(response).to have_http_status(:success)

      json = JSON.parse(response.body)

      expect(json.length).to eq(2)

      expect(json[0]["exchange_rates"][0]["symbol"]).to eq(exchange_rate1.symbol)
      expect(json[0]["exchange_rates"][0]["rate"]).to eq(exchange_rate1.rate)

      expect(json[1]["exchange_rates"][0]["symbol"]).to eq(exchange_rate2.symbol)
      expect(json[1]["exchange_rates"][0]["rate"]).to eq(exchange_rate2.rate)
    end
  end
end
