desc "Daily update to the newest exchange rates"
task :current_exchange_rates => :environment do
  puts "updating exchanges"
  CurrentExchangeRatesWorker.new.perform
  puts "done."
end
