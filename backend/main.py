from fastapi import FastAPI
from pydantic import BaseModel
from pymongo import MongoClient
from profileBundle import ProfileBundle as pM
from productsBundle import ProductsBundle as ppM
# import json


# Activate Virtual Environment: .\env\Scripts\activate 
# Run Command: uvicorn main:app --reload
# Accessing Docs: url + /docs
app = FastAPI()
cluster = MongoClient("mongodb+srv://smallgiant1010:mpCPg4HSkpLtztDE@restaurant-app-db.sxti2r7.mongodb.net/")
profileMethods = pM(cluster=cluster)
productsMethods = ppM(cluster=cluster)

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


# Profile API Requests
@app.get("/profiles")
def get_all_profiles() -> list[dict[str, str | int]]:
    return profileMethods.getProfiles()

@app.get("/profile/{username}")
def get_profile(username: str, inputPassword: str) -> dict[str, str | int]:
    return profileMethods.getProfile(username=username, inputPassword=inputPassword)

@app.post("/profile/create")
def create_profile(username: str, password: str, email: str) -> dict[str, str | int]:
    return profileMethods.createProfile(username=username, password=password, email=email)

@app.put("/profile/{profile_id}/update")
def update_profile(profile_id: int, key: str, value: str | int) -> dict[str, str | int]:
    return profileMethods.updateProfile(profile_id, field=key, new_value=value)

@app.delete("/profile/{profile_id}/delete")
def delete_profile(profile_id: int) -> bool:
    return profileMethods.deleteProfile(profile_id)



# Product Post API Requests
@app.get("/products")
def getAllProducts() -> list[dict[str, str | int]]:
    return productsMethods.getProducts()

@app.get("/products/{name}:{publisher}")
def getProduct(name: str, publisher: str) -> dict[str, str]:
    return productsMethods.getProductInfo(name, publisher)

@app.post("/products/create")
def createProduct(postInfo: dict[str, any]) -> dict[str,str]:
    return productsMethods.createProductPost(postInfo)

@app.put("/products/{product_id}/update")
def updateProduct(product_id: int, key, value) -> dict[str, str]:
    return productsMethods.updateProductPost(product_id, key, value)

@app.delete("/products/{product_id}/delete")
def deleteProduct(product_id: int) -> dict[str, str]:
    return productsMethods.deleteProductPost(product_id)