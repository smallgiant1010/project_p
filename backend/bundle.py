import json
import pymongo
from pymongo import MongoClient

class Bundle:
    def __init__(self) -> None:
        self.cluster = MongoClient("mongodb+srv://smallgiant1010:mpCPg4HSkpLtztDE@restaurant-app-db.sxti2r7.mongodb.net/")
        self.db = self.cluster["restaurant_data"]
        self.collection = self.db["profiles"]


    def getProfiles(self) -> json:
        data: list[dict[str, str | int]] = []
        for x in self.collection.find({}):
            data.append(x)
        
        return json.dump(data)
    
    def getProfile(self, profile_id: dict[str, int]) -> json:
        errorMessage: dict[str, str] = {"Message" : "Profile Not Found"}
        found = self.collection.find_one({"_id" : profile_id})
        return json.dump(found) if found else json.dump(errorMessage)
            
    def createProfile(self, data: dict[str, int | str]) -> bool:
        try:
            self.collection.insert_one(data)
            return True
        except:
            return False
        
    def updateProfile(self, profile_id: dict[str, int], data: dict[str, str | int]) -> bool:
        pass
        
        