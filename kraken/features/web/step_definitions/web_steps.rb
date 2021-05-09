if ENV["ADB_DEVICE_ARG"].nil?
  require 'kraken-mobile/steps/web/kraken_steps'

  Then(/^I login in ghost as admin$/) do
    $email = 'admin@test.com'
    $password = '1a2B3c4D,F'
    $url = 'http://localhost:2370/ghost/'
    @driver.navigate.to $url
      sleep 2
    @driver.find_element(:css, 'input[name="identification"]').send_keys($email)
    @driver.find_element(:css, 'input[name="password"]').send_keys($password)
    @driver.find_element(:css, '#login button[type="submit"]').click
      sleep 2
  end

  Then(/^I click on element having xpath "([^\"]*)"$/) do |xpath|
     @driver.find_element(:xpath, xpath).click
  end
end
