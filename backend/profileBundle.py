import hashlib
from random_word import RandomWords


class ProfileBundle:
    def __init__(self, cluster) -> None:
        self.cluster = cluster
        self.db = self.cluster["restaurant_data"]
        self.collection = self.db["profiles"]
        self.rWord = RandomWords()


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
            return search if self.passwordValidation(inputPassword, search) else incorrectCredentials
        else:
            return notFoundCredentials
    

    def createProfile(self, username: str, password: str, email: str) -> dict[str, str]:
        # Checking for existing Profiles
        if self.collection.find_one({"username": username}): return {"Message" : "This username is already in use."}

        # Hashing and Salting
        saltHasher = hashlib.sha256()
        saltHasher.update(self.rWord.get_random_word().encode())
        hashedSalt = saltHasher.hexdigest()

        passwordHasher = hashlib.sha256()
        passwordHasher.update((password + hashedSalt).encode())
        hashedPassword = passwordHasher.hexdigest()

        # Finding Max ID
        latestProfile = self.collection.find_one(sort=[("_id", -1)])

        # Creating New Profile
        newProfile = {
            "_id": (latestProfile["_id"] + 1) if latestProfile else 1,
            "salt" : hashedSalt,
            "username" : username,
            "password" : hashedPassword,
            "email": email
        }

        # Inserting New Profile
        self.collection.insert_one(newProfile)

        # Returning New Profile
        return newProfile
    
        
    def updateProfile(self, profile_id: int, field: str, new_value: str | int) -> dict[str, str]:
        # Checking if the Profile Exists
        profile = self.collection.find_one({"_id": profile_id})
        if not profile: return {"Message" : "Profile Not Found"}

        if field != "password":
            # Updating Variables
            self.collection.update_one(profile, {"$set" : {field : new_value}})

            # Return Message
            return {"Message": "Profile has been updated"}
        


    def deleteProfile(self, profile_id: int) -> dict[str, str]:
        # Searches for the existence
        if self.collection.find_one({"_id": profile_id}):

            # Deletes Profile
            self.collection.delete_one({"_id": profile_id})
            return {"Message": "Profile Successfully Deleted"}
        else:
            return {"Message": "Profile does not exist"}
        

    def passwordValidation(self, inputPassword: str, search) -> bool:
        # Hashing the Input
        passwordHasher = hashlib.new("SHA256")
        compareValue = (inputPassword + search["salt"]).encode()
        passwordHasher.update(compareValue)
        result = passwordHasher.hexdigest()

        # Comparing Passwords
        return result == search["password"]