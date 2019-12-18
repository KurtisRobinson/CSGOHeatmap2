from pymongo import MongoClient
import bcrypt

client = MongoClient("mongodb://127.0.0.1:27017")
db = client.csstats 				  # Database
users = db.users					  # Collection

data = [
	{ "name" : "Kurtis Robinson",
            "username" : "robinson-k17",  
            "password" : b"password",
            "email" : "robinson-k17@ulster.ac.uk",
            "admin" : False
          },
	{ "name" : "Admin User",
            "username" : "admin-k17",  
            "password" : b"adminpassword",
            "email" : "admin-k17@ulster.ac.uk",
            "admin" : True
          }
]

for new_user in data:
	new_user["password"] = bcrypt.hashpw(new_user["password"], bcrypt.gensalt())
	users.insert_one(new_user)