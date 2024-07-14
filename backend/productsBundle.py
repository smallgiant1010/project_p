
class ProductsBundle: 
    def __init__(self, cluster) -> None:
        self.cluster = cluster
        self.db = cluster["restaurant_data"]
        self.collection = self.db["products"]


    def getProducts(self) -> list[dict[str, str | int]]:
        # Return Value
        allProducts: list[dict[str, str | int]] = []

        # Get all Products
        for x in self.collection.find({}):
            allProducts.append(x)
        
        # Return All Values
        return allProducts
    

    def getProductInfo(self, name: str, publisher: str) -> dict[str, str | int]:
        # Error Info
        productNotFound = {"Message": "This Product does not exist"}

        # Find Product
        search = self.collection.find_one({"name": name}, {"publisher": publisher})

        # Return the Product if Found
        return search if search else productNotFound
    

    def createProductPost(self, post: dict[str, any]) -> dict[str, str]:
        # Messages
        postSuccess = {"Message": "Post successfully Created"}
        postExists = {"Message": "A Post under this name already exists"}

        # Search if product exists
        search = self.collection.find_one({"name" : post["name"]}, {"_id": post["_id"]})

        if search:
            return postExists
        
        self.collection.insert_one(post)
        return postSuccess
    


    def updateProductPost(self, postId: int, field: str, value: any) -> dict[str, str]:
        # Messages
        postSuccess = {"Message": "Post Successfully Updated"}
        postFail = {"Message": "Post Update Failed"}

        # Find The Post
        search = self.collection.find_one({"_id": postId})

        # Updating The Post
        if search:
            self.collection.update_one(search, {"$set": {field: value}})
            return postSuccess
            
        return postFail

    
    def deleteProductPost(self, postId: int) -> dict[str, str]:
        # Messages
        deleteSuccess = {"Message": "Post Successfully Deleted"}
        deleteFail = {"Message": "Post could not be deleted"}

        # Find the Post
        search = self.collection.find_one({"_id": postId})

        # Delete the Post
        if search:
            self.collection.delete_one(search)
            return deleteSuccess
        
        return deleteFail