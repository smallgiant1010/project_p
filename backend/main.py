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
    allow_origins=["*"],  # Allows all origins, you can specify domains like ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)
cluster = MongoClient(os.getenv("MONGO_CONNECT_STRING"))
profileMethods = pM(cluster=cluster)
carData = CD()
class Profile(BaseModel):
    _id: int
    name: str
    email: str
    hashedPassword: str
    salt: str
    age: int
    gender: str
    allergies: list[str]
    username: str

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
    make: str = Query("Toyota", description="Car make"),
    model: str = Query("Camry", description="Car model"),
    year: int = Query(2020, description="Car year"),
    fuel_type: str = Query(None, description="Fuel Type"),
    drive: str = Query(None, description="Drive Type"),
    cylinders: int = Query(None, description="Cylinder Count"),
    transmission: str = Query(None, description="Transmission Type"),
    min_city_mpg: int = Query(None, description="MINCMPG"),
    max_city_mpg: int = Query(None, description="MAXCMPG"),
    min_hwy_mpg: int = Query(None, description="MINHMPG"),
    max_hwy_mpg: int = Query(None, description="MAXHMPG"),
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
        'limit': 50
    }
    filters = {k: v for k, v in filters.items() if v is not None}
    return carData.getCarStats(filters=filters)

@app.get("/cars/marketvalue")
def getMarketValue(year: int=2020, make: str="toyota", model:str="camry"):
    return carData.getMarketValueOfCar(year=year, make=make, model=model)

@app.get("/cars/picture")
def getCarPhoto(year: int=2020, make:str = "toyota", model:str="camry"):
    return carData.getCarImage(year=year, make=make, model=model)



# Wish List Requests
@app.get("/profile/wishlist")
def getWishList(profile_id: dict[str, int]) -> dict[str, str]:
    wishlistData = wL(cluster=cluster, profile_id=profile_id)
    return wishlistData.retrieveWishList()

@app.post("/profile/addCar")
def addToWishlist(profile_id: dict[str, int], carData: dict[str, int | str]) -> dict[str, str]:
    wishlistData = wL(cluster=cluster, profile_id=profile_id)
    return wishlistData.addCar(carData=carData)

@app.delete("/profile/removeCar")
def removeFromWishList(profile_id: dict[str, int], carData: dict[str, int | str]) -> dict[str, str]:
    wishlistData = wL(cluster=cluster, profile_id=profile_id)
    return wishlistData.removeCar(carData=carData)


# http://127.0.0.1:8000
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)


