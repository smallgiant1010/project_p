from fastapi import FastAPI
from pydantic import BaseModel
from bundle import Bundle
import json

app = FastAPI()
profileMethods = Bundle()

class Profile(BaseModel):
    _id: int
    name: str
    email: str
    hashedPassword: str
    salt: str
    age: int
    gender: str
    allergies: list[str]
    email: str

@app.get("/")
def get_all_profiles() -> list[dict[str, str | int]]:
    return profileMethods.getProfiles()

@app.get("/profile/{profile_id}")
def get_profile(profile_id : dict[str, int]) -> dict[str, str | int]:
    return profileMethods.getProfile(profile_id=profile_id)

@app.post("/create")
def create_profile(data: dict[str, int | str]) -> bool:
    return profileMethods.createProfile(data=data)

@app.put("/update/{profile_id}")
def update_profile(profile_id: dict[str, int], data: list[dict[str, dict[any, str | int]]]) -> bool:
    return profileMethods.updateProfile(profile_id=profile_id, data=data)

@app.delete("/delete/{profile_id}")
def delete_profile(profile_id: dict[str, int]) -> bool:
    return profileMethods.deleteProfile(profile_id=profile_id)