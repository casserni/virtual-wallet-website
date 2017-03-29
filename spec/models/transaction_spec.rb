require 'rails_helper'

RSpec.describe Transaction, type: :model do
  it { should have_valid(:body).when("string") }
  it { should_not have_valid(:body).when(nil, "") }

  it { should have_valid(:wallet_id).when(1) }
  it { should_not have_valid(:wallet_id).when(nil, "", "string") }
end
