import hashlib
from random_word import RandomWords
from pymongo import MongoClient

class ProfileBundle:
    def __init__(self) -> None:
        self.cluster = MongoClient("mongodb+srv://smallgiant1010:mpCPg4HSkpLtztDE@restaurant-app-db.sxti2r7.mongodb.net/")
        self.db = self.cluster["restaurant_data"]
        self.collection = self.db["profiles"]
        self.rWord = RandomWords()
        self.hasher = hashlib.new("SHA256")


    def getProfiles(self) -> list[dict[str, str | int]]:
        # Return Value
        data: list[dict[str, str | int]] = []

        # Loop through hashObject
        for x in self.collection.find({}):
            data.append(x)
        

        # All Profiles
        return data
    

    def getProfile(self, username: str, inputPassword: str) -> dict[str, str | int]:
        # Error Messages
        incorrectCredentials: dict[str, str] = {"Message" : "User Credentials are Incorrect"}
        notFoundCredentials: dict[str, str] = {"Message": "Password or Username is Incorrect"}


        # Getting the Profile
        search = self.collection.find_one({"username" : username})

        # Checking for Credentials
        if search:
            return incorrectCredentials if self.passwordValidation(username, inputPassword) else search
        else:
            return notFoundCredentials
    

    def create_profile(self, username: str, password: str, email: str) -> dict[str, str]:
        # Checking for existing Profiles
        if self.collection.find_one({"username": username}): return {"Message" : "This username is already in use."}

        # Hashing and Salting
        randomSalt = self.rWord.get_random_word()
        self.hasher.update(randomSalt)
        hashedSalt = self.hasher.hexdigest()
        hashedPassword = (password + hashedSalt).encode()
        self.hasher.update(hashedPassword)
        hashed = self.hasher.hexdigest()

        # Finding Max ID
        latestProfile = self.collection.find_one(sort=[("_id", -1)])

        # Creating New Profile
        newProfile = {
            "_id": (latestProfile["_id"] + 1) if latestProfile else 1,
            "salt" : hashedSalt,
            "username" : username,
            "password" : hashed,
            "email": email
        }

        # Inserting New Profile
        self.collection.insert_one(newProfile)

        # Returning New Profile
        return newProfile
    
        
    def updateProfile(self, profile_id: dict[str, int], field: str, new_value: str | int) -> dict[str, str]:
        # Checking if the Profile Exists
        profile = self.collection.find_one(profile_id)
        if not profile: return {"Message" : "Profile Not Found"}

        if field != "password":
            # Updating Variables
            self.collection.update_one(profile, {"$set" : {field : new_value}})

            # Return Message
            return {"Message": "Profile has been updated"}
        


    def deleteProfile(self, profile_id: dict[str, int]) -> bool:
        # Searches for the existence
        if self.collection.find_one(profile_id):

            # Deletes Profile
            self.collection.delete_one(profile_id)
            return True
        else:
            return False
        

    def passwordValidation(self, username: str, inputPassword: str) -> bool:
        # Hashing the Input
        search = self.collection.find_one({"username" : username})
        compareValue = (inputPassword + search["salt"]).encode()
        self.hasher.update(compareValue)
        result = self.hasher.hexdigest()

        # Comparing Passwords
        return result == search["password"]