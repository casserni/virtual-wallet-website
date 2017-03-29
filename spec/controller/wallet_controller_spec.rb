require "rails_helper"

RSpec.describe Api::V1::WalletsController, type: :controller do
  describe "GET #index" do
    let!(:user) { FactoryGirl.create(:user) }
    let!(:wallet){FactoryGirl.create(:wallet, user: user) }
    let!(:wallet2){FactoryGirl.create(:wallet, user: user) }
    let!(:amount1){ FactoryGirl.create(:amount, wallet: wallet) }
    let!(:amount2){ FactoryGirl.create(:amount, wallet: wallet) }
    let!(:transaction){ FactoryGirl.create(:transaction, wallet: wallet) }

    it "should return all wallets for a user" do
      get :index, params: { user_id: user.id }
      expect(response).to have_http_status(:success)

      json = JSON.parse(response.body)

      expect(json.length).to eq(2)
      expect(json[0]["name"]).to eq(wallet.name)
      expect(json[0]["base"]).to eq(wallet.base)
      expect(json[0]["user"]).to_not eq(nil)
      expect(json[0]["amounts"].length).to eq(2)
      expect(json[0]["transactions"].length).to eq(1)
      expect(json[1]).to_not eq(nil)
      expect(json[2]).to eq(nil)
    end

    it "should return a specific wallets for a user" do
      get :show, params: { user_id: user.id, id: wallet.id }
      expect(response).to have_http_status(:success)

      json = JSON.parse(response.body)
      expect(json["name"]).to eq(wallet.name)
      expect(json["base"]).to eq(wallet.base)
      expect(json["user"]).to_not eq(nil)
      expect(json["amounts"].length).to eq(2)
      expect(json["transactions"].length).to eq(1)
    end

    it "should create a new wallet for a user" do
      post :create, params: { user_id: user.id, wallet:{ name: "New Wallet", user_id: user.id, base: "New Base"} }
      expect(response).to have_http_status(:success)

      get :index, params: { user_id: user.id }
      json = JSON.parse(response.body)

      expect(json.length).to eq(3)
      expect(json[2]["name"]).to eq("New Wallet")
      expect(json[2]["base"]).to eq("New Base")
      expect(json[2]["user_id"]).to eq(user.id)
    end

    it "should create a new transaction and amount" do
      Amount.create(symbol: "symbol", quantity: 10, wallet: wallet)
      post :update, params: { user_id: user.id, id: wallet.id, trade:{ amount: 1.0, base_rate: 2, new_rate: 1, symbol_base: "symbol", symbol_new: "new symbol"} }
      expect(response).to have_http_status(:success)

      get :show, params: { user_id: user.id, id: wallet.id }
      json = JSON.parse(response.body)

      expect(json["name"]).to eq(wallet.name)

      expect(json["amounts"][2]["symbol"]).to eq("symbol")
      expect(json["amounts"][2]["quantity"]).to eq(9.0)

      expect(json["amounts"][3]["symbol"]).to eq("new symbol")
      expect(json["amounts"][3]["quantity"]).to eq(0.5)

      expect(json["transactions"][1]["body"]).to eq("1.0 symbol was traded for 0.5 new symbol")
    end

    it "should add quantity to an amount" do
      post :update, params: { user_id: user.id, id: wallet.id, add_funds:{ amount: 1.0, base: amount1.symbol } }
      expect(response).to have_http_status(:success)

      get :show, params: { user_id: user.id, id: wallet.id }
      json = JSON.parse(response.body)

      expect(json["name"]).to eq(wallet.name)
      expect(json["amounts"][1]["quantity"]).to eq(amount1.quantity + 1)
      expect(json["transactions"][1]["body"]).to include("deposited")
    end

    it "should delete a wallet for a user" do
      delete :destroy, params: { user_id: user.id, id: wallet.id }
      expect(response).to have_http_status(:success)

      get :index, params: { user_id: user.id }
      json = JSON.parse(response.body)

      expect(json.length).to eq(1)
      expect(json[0]["name"]).to_not eq(wallet.name)
      expect(json[0]["base"]).to_not eq(wallet.base)
      expect(json[0]["name"]).to eq(wallet2.name)
      expect(json[0]["base"]).to eq(wallet2.base)
      expect(json[0]["user"]).to_not eq(nil)
    end
  end
end
