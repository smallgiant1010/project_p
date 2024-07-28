# import pymongo
# from pymongo import MongoClient
""" 
    -Insert One Entry(param: dictionary of data): insert_one()
    -Insert Many Entries(param: List[documents]): insert_many([])
    -Find Specific Entries(param: Any Key-Value pair in the document, return: objectHash): find({key: value}, {key: value}); 
        -Loop through the Hash to return Readable Data
        -It works like a dictionary so you can use the keys to retrieve the values
    -Find One Entry(param: just put in the key value pair for id, return: dictionary/None): find_one({id: number})
    -Find Everything(param: {}, return: objectHash): find({})
        -You must use a loop to retrieve readable data
    -Delete One Entry(param: Just use Id key value pair unless you have a better match): delete_one({id: number})
    -Delete Many Entries(param: key value pairs): delete_many({key: value})
    -Update One Entry(param: dictionary, update Operators): update_one({key: value}, {key: value})
        -Update Operators: https://www.mongodb.com/docs/manual/reference/operator/update-field/
    -Count Documents(param: pattern, return: number of documents that match the pattern): count_documents({key: value})
    -Sort Documetns(param: key, 1/-1):sort(key, ascend/descend)
    -Remove Collection: drop()
    -Limiting Retrieval Data(param: number to limit to): limit(number)
"""
# cluster = MongoClient("mongodb+srv://smallgiant1010:mpCPg4HSkpLtztDE@restaurant-app-db.sxti2r7.mongodb.net/")
# db = cluster["restaurant_data"]
# collection = db["profiles"]

class Wishlist:

    def __init__(self, cluster, profile_id: dict[str, int]) -> None:
        self.cluster = cluster
        self.id = profile_id
        self.db = self.cluster["restaurant_data"]
        self.collection = self.db["wishlist"]
        self.profile_id = profile_id

    
    # Retrieving WishList
    def retrieveWishList() -> list[dict[str, str | int]]:
        pass

    
    # Add to WishList
    def addCar() -> dict[str, str]:
        pass


    # Remove from WishList
    def removeCar() -> dict[str, str]:
        pass