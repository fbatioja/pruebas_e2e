$versionapp = "3.3.0"
$featurescenariostep = ""
_id = 0

if ENV["ADB_DEVICE_ARG"].nil?
  require 'kraken-mobile/steps/web/kraken_steps'

  Given(/^I set scenario "(.*?)"$/) do |scenario|
    $featurescenariostep = scenario
  end

  Then(/^I login in ghost as admin$/) do
    $email = 'admin@test.com'
    $password = '1a2B3c4D,F'
    $url = 'http://localhost:2368/ghost/'
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

  Then(
    /^I select option with text "(.*?)" for dropdown with id "(.*?)"$/) do |op_text, sel_id|
    drop = @driver.find_element(:id, sel_id)
    choose = Selenium::WebDriver::Support::Select.new(drop)
    choose.select_by(:text, op_text)
    sleep 2
  end

  Then(/^I enter "([^\"]*)" into input field having xpath "([^\"]*)"$/) do |text, selector|
    @driver.find_element(:xpath, selector).send_keys(text)
    sleep 2
  end


  AfterStep do |_scenario|
    Dir.mkdir("./screenshots") unless File.exist?("./screenshots")
    Dir.mkdir("./screenshots/#{$versionapp}") unless File.exist?("./screenshots/#{$versionapp}")
    Dir.mkdir("./screenshots/#{$versionapp}/#{$featurescenariostep}") unless File.exist?("./screenshots/#{$versionapp}/#{$featurescenariostep}")
    path = "./screenshots/#{$versionapp}/#{$featurescenariostep}/#{_id += 1}_#{$featurescenariostep}.png"
    @driver.save_screenshot(path)
    embed(path, 'image/png', File.basename(path))
  end

end
