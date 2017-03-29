require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_valid(:email).when("user@example.com", "another@email.com") }
  it { should_not have_valid(:email).when(nil, '', "user", "users.com")}

  it "has a nonmatching password confirmation for the password" do
    user = User.new
    user.password = "password"
    user.password_confirmation = "anotherpassword"

    expect(user).to_not be_valid
    expect(user.errors[:password_confirmation]).to_not be_blank
  end
end
