require "rails_helper"

RSpec.describe Api::V1::ExchangeRatesController, type: :controller do
  describe "GET #index" do
    let!(:day) { FactoryGirl.create(:day) }
    let!(:exchange_rate1) { FactoryGirl.create(:exchange_rate, day: day) }
    let!(:exchange_rate2) { FactoryGirl.create(:exchange_rate, day: day) }

    it "should return all exchange rates" do
      get :index, params: { day_id: day.id }
      expect(response).to have_http_status(:success)

      json = JSON.parse(response.body)

      expect(json.length).to eq(2)
      expect(json[0]["rate"]).to eq(1.0)
      expect(json[0]["symbol"]).to eq("symbol1")
      expect(json[1]["rate"]).to eq(2.0)
      expect(json[1]["symbol"]).to eq("symbol2")
    end
  end
end
