from fastapi import FastAPI
from pydantic import BaseModel
from bundle import Bundle
import json

app = FastAPI()
profileMethods = Bundle()

class Profile(BaseModel):
    _id: int
    name: str
    age: int
    gender: str
    allergies: list[str]
    email: str

@app.get("/")
def get_all_profiles() -> json:
    return profileMethods.getProfiles()

@app.get("/profile/{profile_id}")
def get_profile(profile_id : dict[str, int]) -> json:
    return profileMethods.getProfile(profile_id=profile_id)

@app.post("/create")
def create_profile(data: dict[str, int | str]) -> bool:
    return profileMethods.createProfile(data=data)

@app.put("/update/{profile_id}")
def update_profile(profile_id: dict[str, int], data: dict[str, str | int]) -> bool:
    pass

