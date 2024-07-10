import json
import pymongo
from pymongo import MongoClient

class Bundle:
    def __init__(self) -> None:
        self.cluster = MongoClient("mongodb+srv://smallgiant1010:mpCPg4HSkpLtztDE@restaurant-app-db.sxti2r7.mongodb.net/")
        self.db = self.cluster["restaurant_data"]
        self.collection = self.db["profiles"]


    def getProfiles(self) -> list[dict[str, str | int]]:
        data: list[dict[str, str | int]] = []
        for x in self.collection.find({}):
            data.append(x)
        
        return data
    

    def getProfile(self, profile_id: dict[str, int]) -> dict[str, str | int]:
        errorMessage: dict[str, str] = {"Message" : "Profile Not Found"}
        found = self.collection.find_one({"_id" : profile_id})
        if found:
            return found
        else:
            return errorMessage
            

    def createProfile(self, data: dict[str, int | str]) -> bool:
        if self.collection.find_one(data) == None:
            self.collection.insert_one(data)
            return True
        else:
            return False
        
        
    def updateProfile(self, profile_id: dict[str, int], data: list[dict[str, dict[any, str | int]]]) -> bool:
        if self.getProfile(profile_id) != None:
            self.collection.update_one(profile_id, data)
            return True
        else:
            return False
        
    def deleteProfile(self, profile_id: dict[str, int]) -> bool:
        if self.getProfile(profile_id=profile_id):
            self.collection.delete_one(profile_id)
            return True
        else:
            return False