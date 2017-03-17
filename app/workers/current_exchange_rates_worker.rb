class CurrentExchangeRatesWorker
  def perform
    Exchange.destroy_all
    url = "https://api.fixer.io/latest?base=USD"
    uri = URI(url)
    response = Net::HTTP.get(uri)
    new_rates = JSON.parse(response)["rates"]
    Exchange.create(symbol: "USD", rate: 1)
    new_rates.each_pair do |key, value|
      Exchange.create(symbol: key, rate: value)
    end
  end
end
