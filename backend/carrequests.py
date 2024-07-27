import requests
import os
from dotenv import load_dotenv, dotenv_values 


class CarData:
    def __init__(self, cluster, profile_id: dict[str, int]) -> None:
        self.cluster = cluster
        self.id = profile_id
        self.db = self.cluster["restaurant_data"]
        self.collection = self.db["wishlist"]
        self.ninja = "https://api.api-ninjas.com/v1/cars"
        self.marketChecker = "https://mc-api.marketcheck.com/v2/stats/car"
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
        # print(f"Request URL: {response.url}")
        # print(f"Status Code: {response.status_code}")
        # print(f"Response Text: {response.text}")

        # Return Statements
        if response.status_code == 200:
            data = response.json()
            return data
        
        else:
            return errorMessage
        
    

    def getMarketValueOfCar(self, year: int = 2015, make: str = "ford", model: str = "f-150"):
        # Error Message
        errorMessage = {
            "Message": "Could not find market value."
        }

        ymm = f"{year}|{make}|{model}"

        # Parameters
        params = {
            "api_key": os.getenv("MARKET_CHECK_API_KEY"),
            "ymm": ymm
        }

        # API Call
        response = requests.get(self.marketChecker, params=params)

        
        # Debugging information
        # print(f"Request URL: {response.url}")
        # print(f"Status Code: {response.status_code}")
        # print(f"Response Text: {response.text}")


        # Return Statements
        if response.status_code == 200:
            data = response.json()
            return data
        
        else:
            return errorMessage

        