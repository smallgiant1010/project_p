from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
from profileBundle import ProfileBundle as pM
from dotenv import load_dotenv, dotenv_values 
from carrequests import CarData as CD
from wishlist import Wishlist as wL
import os
import uvicorn


# Activate Virtual Environment: .\env\Scripts\activate 
# Run Command: uvicorn main:app --reload
# Accessing Docs: url + /docs
load_dotenv()
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

cluster = MongoClient(os.getenv("MONGO_CONNECT_STRING"))
profileMethods = pM(cluster=cluster)
carData = CD()
# class Profile(BaseModel):
#     _id: int
#     name: str
#     email: str
#     hashedPassword: str
#     salt: str
#     age: int
#     gender: str
#     allergies: list[str]
#     username: str

@app.get("/")
def welcome():
    return { "message": "Welcome"}

# Profile API Requests
@app.get("/profiles")
def get_all_profiles() -> list[dict[str, str | int]]:
    return profileMethods.getProfiles()

@app.get("/profiles/{username}")
def get_profile(username: str, inputPassword: str) -> dict[str, str | int]:
    return profileMethods.getProfile(username=username, inputPassword=inputPassword)

@app.post("/profiles/create")
def create_profile(loginInfo: dict[str, str]) -> dict[str, str | int]:
    return profileMethods.createProfile(username=loginInfo["username"], password=loginInfo["password"], email=loginInfo["email"])

@app.put("/profiles/{profile_id}/update")
def update_profile(profile_id: int, key: str, value: str | int) -> dict[str, str | int]:
    return profileMethods.updateProfile(profile_id, field=key, new_value=value)

@app.delete("/profiles/{profile_id}/delete")
def delete_profile(profile_id: int) -> bool:
    return profileMethods.deleteProfile(profile_id)


# Car Requests
@app.get("/car/stats")
def getCarData(
    make:str = None,
    year: int = Query(1993, description="Car Year Default"),
    fuel_type: str = None,
    drive: str = None,
    cylinders: int = None,
    transmission: str = None,
    min_city_mpg: int = None,
    max_city_mpg: int = None,
    min_hwy_mpg: int = None,
    max_hwy_mpg: int = None,
    model: str = Query("Camry", description="Car model"),
): 
    filters = {
        'make': make,
        'model': model,
        'year': year,
        'fuel_type': fuel_type,
        'drive': drive,
        'cylinders': cylinders,
        'transmission': transmission,
        'min_city_mpg': min_city_mpg,
        'max_city_mpg': max_city_mpg,
        'min_hwy_mpg': min_hwy_mpg,
        'max_hwy_mpg': max_hwy_mpg,
        'limit': 8
    } 
    print(filters)
    data = {k: v for i, (k, v) in enumerate(filters.items()) if v is not None}
    print(data)
    return carData.getCarStats(filters=data)
 
@app.get("/cars/marketvalue")
def getMarketValue(year: int=2020, make: str="toyota", model:str="camry"):
    return carData.getMarketValueOfCar(year=year, make=make, model=model)

@app.get("/cars/picture")
def getCarPhoto(make:str = "toyota", model:str="camry"):
    return carData.getCarImage(make=make, model=model)
  
   
# Wish List Requests
@app.get("/profile/wishlist")
def getWishList(input_username: str) -> list[dict[str, str | int]]:
    wishlistData = wL(cluster=cluster, profile_username=input_username)
    return wishlistData.retrieveWishList()

@app.post("/profile/addCar")
def addToWishlist(input_username: str, carData: dict[str, int | str]) -> dict[str, str]:
    wishlistData = wL(cluster=cluster, profile_username=input_username)
    return wishlistData.addCar(carData=carData)

@app.delete("/profile/removeCar")
def removeFromWishList(input_username: str, carData: dict[str, int | str]) -> dict[str, str]:
    wishlistData = wL(cluster=cluster, profile_username=input_username)
    return wishlistData.removeCar(carData=carData)
 
 
# http://127.0.0.1:8082
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8082, reload=True, timeout_keep_alive=5)


 