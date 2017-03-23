class CurrentExchangeRatesWorker
  def perform
    date = (Time.now).strftime("%Y-%m-%d")
    day = Day.create(date: date)
    url = "https://api.fixer.io/#{date}?base=USD"
    uri = URI(url)
    response = Net::HTTP.get(uri)
    new_rates = JSON.parse(response)["rates"]
    ExchangeRate.create(symbol: "USD", rate: 1, day_id: day.id)
    new_rates.each_pair do |key, value|
      ExchangeRate.create(symbol: key, rate: value, day_id: day.id)
    end
  end
end
