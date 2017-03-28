require 'json'

class Api::V1::WalletsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @user_id = params[:user_id].to_i
    render json: Wallet.where(user_id: @user_id), include: ['user', 'amounts', 'transactions']
  end

  def show
    @user_id = params[:user_id].to_i
    @wallet_id = params[:id].to_i
    render json: Wallet.where(user_id: @user_id, id: @wallet_id)[0], include: ['user', 'amounts', 'transactions']
  end

  def create
    @wallet = Wallet.new(wallet_params)
    if @wallet.save
      flash[:notice] = "Wallet added successfully"
      Amount.create(wallet_id: @wallet.id, symbol: wallet_params[:base])
      Transaction.create(wallet_id: @wallet.id, body: "#{@wallet.name} was created")
    end
  end

  def update
    if !params[:add_funds].nil?
      base = Amount.where(wallet_id: params[:id], symbol: add_funds_params[:base])[0]
      base.update_attribute(:quantity, (base.quantity + add_funds_params[:amount].to_f))
      Transaction.create(wallet_id: params[:id], body: "#{add_funds_params[:amount].to_f} #{add_funds_params[:base]} was deposited")

    elsif !params[:trade].nil?
      symbol_base = trade_params[:symbol_base]
      symbol_new = trade_params[:symbol_new]
      amount = trade_params[:amount].to_f

      if symbol_base != symbol_new
        base = Amount.where(wallet_id: params[:id], symbol: symbol_base)[0]
        if base.quantity - amount >= 0
          base.update_attribute(:quantity, (base.quantity - amount))
          newc = Amount.where(wallet_id: params[:id], symbol: symbol_new)[0]
          new_amount = amount * trade_params[:new_rate].to_f / trade_params[:base_rate].to_f

          Transaction.create(wallet_id: params[:id], body: "#{amount} #{symbol_base} was traded for #{new_amount} #{symbol_new}")

          if newc.nil?
            Amount.create(wallet_id: params[:id], symbol: symbol_new, quantity: new_amount)
          else
            newc.update_attribute(:quantity, (newc.quantity + new_amount))
          end
        end
      end
    end
  end

  def destroy
    @user_id = params[:user_id].to_i
    @wallet_id = params[:id].to_i
    @wallet = Wallet.where(user_id: @user_id, id: @wallet_id)
    @wallet.destroy_all
  end

  private

  def wallet_params
    params.require(:wallet).permit(:name, :user_id, :base)
  end

  def trade_params
    params.require(:trade).permit(:amount, :base_rate, :new_rate, :symbol_base, :symbol_new)
  end

  def add_funds_params
    params.require(:add_funds).permit(:amount, :base)
  end
end
