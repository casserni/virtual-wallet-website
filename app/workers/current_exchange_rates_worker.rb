class CurrentExchangeRatesWorker
  def perform
    Day.destroy_all
    ExchangeRate.destroy_all

    url = "https://api.fixer.io/latest?base=USD"
    uri = URI(url)
    response = Net::HTTP.get(uri)
    date = Date.parse(JSON.parse(response)["date"])

    7.times do
      date_ymd = date.strftime("%Y-%m-%d")
      day = Day.create(date: date_ymd)
      url = "https://api.fixer.io/#{date_ymd}?base=USD"
      uri = URI(url)
      response = Net::HTTP.get(uri)
      new_rates = JSON.parse(response)["rates"]
      ExchangeRate.create(symbol: "USD", rate: 1, day_id: day.id)
      new_rates.each_pair do |key, value|
        ExchangeRate.create(symbol: key, rate: value, day_id: day.id)
      end
      date = date - 1.day
    end
  end
end
