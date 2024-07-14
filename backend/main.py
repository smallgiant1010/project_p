from fastapi import FastAPI
from pydantic import BaseModel
from profileBundle import ProfileBundle as pM
# import json

app = FastAPI()
profileMethods = pM()

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

@app.get("/profiles")
def get_all_profiles() -> list[dict[str, str | int]]:
    return profileMethods.getProfiles()

@app.get("/profile/{username}")
def get_profile(username: str, inputPassword: str) -> dict[str, str | int]:
    return profileMethods.getProfile(username=username, inputPassword=inputPassword)

@app.post("/create")
def create_profile(username: str, password: str, email: str) -> dict[str, str | int]:
    return profileMethods.createProfile(username=username, password=password, email=email)

@app.put("/update/{profile_id}")
def update_profile(profile_id: int, key: str, value: str | int) -> dict[str, str | int]:
    return profileMethods.updateProfile(profile_id, field=key, new_value=value)

@app.delete("/delete/{profile_id}")
def delete_profile(profile_id: int) -> bool:
    return profileMethods.deleteProfile(profile_id)

# Activate Virtual Environment: .\env\Scripts\activate 
# Run Command: uvicorn main:app --reload
# Accessing Docs: url + /docs