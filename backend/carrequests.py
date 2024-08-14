import requests
import os
from dotenv import load_dotenv, dotenv_values 


class CarData:
    def __init__(self) -> None:
        self.ninja = "https://api.api-ninjas.com/v1/cars"
        self.marketChecker = "https://mc-api.marketcheck.com/v2/stats/car"
        self.unsplash = "https://api.unsplash.com/search/photos"
        load_dotenv()
    

    def getCarStats(self, filters: dict[str, str | int]) -> list[dict[str, str | int]] | dict[str, str]:
        # Error Message
        errorMessage = {
            "Message": "Car does not exist in this database."
        }

        # API KEY
        api_key = os.getenv("NINJA_API_KEY")

        # Check for api key
        if not api_key:
            return {"Message": "API key is missing"}

        # API Call
        response = requests.get(self.ninja, params=filters, headers={'X-Api-Key': api_key})
            
        # Debugging information
        print(f"Request URL: {response.url}")
        # print(f"Status Code: {response.status_code}")
        # print(f"Response Text: {response.text}")

        # Return Statements
        if response.status_code == 200:
            data = response.json()
            return data
        
        else:
            return errorMessage
        
    

    def getMarketValueOfCar(self, year: int, make: str, model: str):
        # Error Message
        errorMessage = {
            "Message": "Could not find market value."
        }

        ymm = f"{year}|{make.lower()}|{model.lower()}"

        # Parameters
        params = {
            "api_key": os.getenv("MARKET_CHECK_API_KEY"),
            "ymm": ymm
        }

        # API Call
        response = requests.get(self.marketChecker, params=params)

        
        # Debugging information
        print(f"Request URL: {response.url}")
        print(f"Status Code: {response.status_code}")
        print(f"Response Text: {response.text}")


        # Return Statements
        if response.status_code == 200:
            data = response.json()
            return self.processMarketValue(data)
        else:
            return errorMessage

    
    def processMarketValue(self, dataset=dict[str, dict[str, int]]) -> dict[str, int]:
        # Final String
        result = {}
 
        # Search for Market Values
        for stat in dataset:
            if stat == "price_stats":
                if "median" in dataset.get(stat):
                    result["value"] = dataset.get(stat)["median"]
                else:
                    result["value"] = dataset.get(stat)["mean"]
        # Unfound Statistics
        if "value" not in result:
            result["value"] = "This car does not have a Market Value"
        print(result)
        # Return Market Value
        return result
    
    def getCarImage(self, year: int, make: str, model:str) -> dict[str, str] | list[dict[str, str | int]]:
        # Error Message
        errorMessage = {
            "Message": "Could not retrieve a Image for this car"
        }
        
        # Result Dictionary
        result = {
            "image_url": None,
            "credit_string": None
        }

        # Parameters
        params = {
            'query': f"A {year} {make} {model} car",
            'client_id': os.getenv("UNSPLASH_API_KEY"),
            'page': 1,
            'per_page': 1
        }

        # API CALL
        response = requests.get(self.unsplash, params=params)


        # Succesful Response
        if response.status_code == 200:
            # Parse Json
            data = response.json()

            # Credential Variables
            photographer_name = None
            photographer_url = None

            # Search for data
            for map in data["results"]:

                # Credential Validation
                if "user" in map:
                    photographer_name = map["user"]["first_name"] + map["user"]["last_name"]
                    photographer_url = map["user"]["links"]["html"]
                    result["credit_string"] = f"Photo by {photographer_name} ({photographer_url}) on Unsplash"
                
                # Image Validation
                if "links" in map:
                    result["image_url"] = map["urls"]["regular"]

            # Return Link and Profile
            return result
        
        # Unsuccesful Response
        else:
            return errorMessage