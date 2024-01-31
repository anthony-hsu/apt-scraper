from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from fake_useragent import UserAgent
import json
import locale


# Global
BR = ["bed0", "bed1", "bed2", "all"]
aptData = []
service = Service()
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless')
ua = UserAgent()
chrome_options.add_argument('user-agent={0}'.format(ua.chrome))


# Functions
def runScraper(neighborhood, city, state, numBeds, maxPrice, minSqft):
  def isValid(data, maxPrice, minSqft): 
    if (locale.atof(data["price"].strip("$").replace(",", "")) > int(maxPrice) or
        int(data["sqft"]) < int(minSqft)):
      return False
    else:
      return True

  def scrapeApartment(numBedsString, maxPrice, minSqft):
    aptName = driver.find_element(By.ID, "propertyName").get_attribute("textContent").strip()
    try:
      pricingViewExists = True if len(driver.find_elements(By.ID, "pricingView")) > 0 else False
      if not pricingViewExists:
        return
      element = wait.until(EC.presence_of_element_located((By.ID, "pricingView")))
      unitArray = element.find_element(By.XPATH, f".//div[@data-tab-content-id='{numBedsString}']").find_elements(By.CLASS_NAME, "hasUnitGrid")
      for unit in unitArray:
        modelInfo = unit.find_element(By.CLASS_NAME, "priceGridModelWrapper")
        modelName = modelInfo.find_element(By.XPATH, ".//span[@class='modelName']").get_attribute("textContent").strip()
        beds = modelInfo.find_element(By.XPATH, ".//span[@class='detailsTextWrapper']").get_attribute("textContent").strip().split(",")[0].strip()
        baths = modelInfo.find_element(By.XPATH, ".//span[@class='detailsTextWrapper']").get_attribute("textContent").strip().split(",")[1].strip()
        unitRows = unit.find_element(By.CLASS_NAME, "unitGridContainer").find_elements(By.XPATH, ".//li[contains(@class, 'unitContainer')]")
        for unitRow in unitRows:
          data = {}
          data["aptName"] = aptName
          data["modelName"] = modelName
          data["beds"] = beds
          data["baths"] = baths
          data["unit"] = unitRow.get_attribute("data-unit").strip()
          unitPrice = unitRow.find_element(By.XPATH, ".//div[contains(@class,'pricingColumn')]").find_element(By.XPATH, ".//span[@data-unitname]")
          data["price"] = unitPrice.get_attribute("textContent").strip()
          unitSqft = unitRow.find_element(By.XPATH, ".//div[@class = 'sqftColumn column']").find_element(By.XPATH, ".//span[not(@class)]")
          data["sqft"] = unitSqft.get_attribute("textContent").strip()
          unitAvail = unitRow.find_element(By.XPATH, ".//span[contains(@class,'dateAvailable')]")
          data["availability"] = unitAvail.get_attribute("textContent").strip().split("\n")[-1].strip()
          data["ratio"] = int(data["sqft"].replace(",","")) / locale.atof(data["price"].strip("$").replace(",", ""))
          if isValid(data, maxPrice, minSqft):
            data["id"] = len(aptData)
            aptData.append(data)
    except Exception as error:
      print(f"ERROR occurred scraping {aptName}:", error)

  driver = webdriver.Chrome(service=service, options=chrome_options)
  wait = WebDriverWait(driver, 10)
  # # Parameters
  url = f"https://www.apartments.com/{neighborhood.replace(' ', '-')}-{city}-{state}/pet-friendly-dog/washer-dryer/"
  numBedsString = BR[int(numBeds)]
  driver.get(url)
  wait.until(EC.presence_of_element_located((By.CLASS_NAME, "placard")))
  cards = driver.find_elements(By.CLASS_NAME, "placard")
  original_window = driver.current_window_handle
  listingUrls = []
  for card in cards:
    cardUrl = card.get_attribute("data-url")
    if cardUrl:
      listingUrls.append(cardUrl)
  for listingUrl in listingUrls:
    try:
      driver.switch_to.new_window('tab')
      driver.get(listingUrl)
      wait.until(EC.presence_of_element_located((By.ID, "propertyName")))
      scrapeApartment(numBedsString, maxPrice, minSqft)
      driver.close()
      driver.switch_to.window(original_window)
    except Exception as error:
      print(error)
    finally:
      continue  

  jsonData = json.dumps(aptData)

  driver.quit()

  return jsonData