if ENV["ADB_DEVICE_ARG"].nil?
  require 'kraken-mobile/steps/web/kraken_steps'

  Then(/^I login in ghost as admin$/) do
    @driver.navigate.to 'http://localhost:2370/ghost/'
      sleep 2
    @driver.find_element(:css, 'input[name="identification"]').send_keys('admin@test.com')
    @driver.find_element(:css, 'input[name="password"]').send_keys('1a2B3c4D,F')
    @driver.find_element(:css, '#login button[type="submit"]').click
      sleep 2
  end

  Then(/^I navigate to (.*?) in the (.*?) menu$/) do |item, menu|
    $selector_menu = '.gh-nav-body .gh-nav-' + menu + ' a[href="#/' + item + '/"]'
    @driver.find_element(:css, $selector_menu).click
      sleep 2
  end

  Then(/^I create a new page$/) do |item, menu|
    @driver.find_element(:css, 'section .view-actions a[href="#/editor/page/"]').click
      sleep 2
  end

  Then(/^I should see (.*?) in the Page (.*?)$/) do |status, page|
    @driver.find_element(:css, 'section .view-actions a[href="#/editor/page/"]').click
      sleep 2
  end

  Then(/^I store a variable with the current url$/) do
    $url_variable = @driver.current_url
    File.write('./.variable.txt', $url_variable)
    puts($url_variable)
  end

  Given(/^I navigate to page with the url stored in the variable$/) do
    $url_variable = IO.read("./.variable.txt")
    puts($url_variable)
    @driver.navigate.to $url_variable
    sleep 2
  end

end
