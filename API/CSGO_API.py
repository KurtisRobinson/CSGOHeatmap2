from flask import Flask, jsonify, make_response, request
from pymongo import MongoClient
from bson import ObjectId
import jwt
import datetime
from functools import wraps
from flask_cors import CORS

app = Flask(__name__)

app.config['SECRET_KEY'] = 'mysecret'

CORS(app)

client = MongoClient("mongodb://127.0.0.1:27017")
db = client.csstats 				# Database
sample_match = db.sample_match		# Collection

def jwt_required(func):
	@wraps(func)
	def jwt_required_wrapper(*args, **kwargs):
		#token = request.args.get('token')
		token = None
		if 'x-access-token' in request.headers:
			token = request.headers['x-access-token']
		if not token:
			return jsonify({'message' : 'Token is missing'}), 401
		try:
			data = jwt.decode(token, app.config['SECRET_KEY'])
		except:
			return jsonify({'message' : 'Token is invalid'}), 401
		return func(*args, **kwargs)
	return jwt_required_wrapper

@app.route("/api/v1.0/login", methods=['GET'])
def login():
	auth = request.authorization
	if auth and auth.password == 'password':
		token = jwt.encode( \
	   {'user' : auth.username, \
		'exp' : datetime.datetime.utcnow() + \
		datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
		return jsonify({'token' : token.decode('UTF-8')})
	return make_response('Could not verify', 401, \
	{'WWW-Authenticate' : \
	 'Basic realm = "Login required"'})
 
@app.route("/")
@app.route("/api/v1.0/sample_match", methods=["GET"])
def show_all():
	data_to_return = []
	for match_data in sample_match.find():
		match_data['_id'] = str(match_data['_id'])
		data_to_return.append(match_data)
	return make_response( jsonify( data_to_return ), 200)

@app.route("/api/v1.0/sample_match", methods=["POST"])
def add_data():
	if "ID" in request.form and "map" in request.form and "round" in request.form:
		new_data = { 
				 "ID": request.form["ID"],
				 "map": request.form["map"],
				 "round": request.form["round"],
				 "att_side": request.form["att_side"],
				 "vic_side": request.form["vic_side"],
				 "hp_dmg": request.form["hp_dmg"],
				 "arm_dmg": request.form["arm_dmg"],
				 "is_bomb_planted": request.form["is_bomb_planted"],
				 "bomb_site": request.form["bomb_site"],
				 "wp": request.form["wp"],
				 "wp_type": request.form["wp_type"],
				 "winner_side": request.form["winner_side"],
				 "att_pos_x": request.form["att_pos_x"],
				 "att_pos_y": request.form["att_pos_y"],
				 "vic_pos_x": request.form["vic_pos_x"],
				 "vic_pos_y": request.form["vic_pos_y"],
				 "round_type": request.form["round_type"],
			   }
		new_data_id = sample_match.insert_one(new_data)
		new_data_link = "http://127.0.0.1:5000/api/v1.0/sample_match/" + str(new_data_id.inserted_id)
		return make_response( jsonify( {"url" : new_data_link} ), 201)
	else: 
		return make_response( jsonify( {"error" : "Missing form data"} ), 404)
	

@app.route("/api/v1.0/sample_match/<string:ID>", methods=["GET"])
@jwt_required	
def show_one(ID):
	data_to_return = sample_match.find_one({'_id':ObjectId(ID)})
	if data_to_return is not None:
		data_to_return['_id'] = str(data_to_return['_id'])
		return make_response( jsonify( data_to_return ), 200)
	else :
		return make_response( jsonify( {"error" : "Invalid data ID"} ), 404)
		
@app.route("/api/v1.0/sample_match/<string:ID>", methods=["PUT"])
def edit_data(ID):
	if "ID" in request.form and "map" in request.form and "round" in request.form:
		edited_data = sample_match.update_one( { "_id" : ObjectId(ID) }, {
		"$set" : { "map" : request.form["map"],
				   "round" : request.form["round"],
				   "att_side" : request.form["att_side"],
				   "vic_side" : request.form["vic_side"],
				   "hp_dmg" : request.form["hp_dmg"],
				   "arm_dmg" : request.form["arm_dmg"],
				   "is_bomb_planted" : request.form["is_bomb_planted"],
				   "bomb_site" : request.form["bomb_site"],
				   "wp" : request.form["wp"],
				   "wp_type" : request.form["wp_type"],
				   "winner_side" : request.form["winner_side"],
				   "att_pos_x" : request.form["att_pos_x"],
				   "att_pos_y" : request.form["att_pos_y"],
				   "vic_pos_x" : request.form["vic_pos_x"],
				   "vic_pos_y" : request.form["vic_pos_y"],
				   "round_type" : request.form["round_type"]
				   #"ID" : request.form["ID"] values returned in quotes.
				 }
		} )
		if edited_data.matched_count == 1:
		  edited_data_link = "http://127.0.0.1:5000/api/v1.0/sample_match/" + ID
		  return make_response( jsonify( {"url" : edited_data_link} ), 200)	
		else:
		  return make_response( jsonify( {"error" : "Invalid Data ID"} ), 404)
	else: 
		return make_response( jsonify( {"error" : "Missing Form Data"} ), 404)


@app.route("/api/v1.0/sample_match/<string:ID>", methods=["DELETE"])
def delete_data(ID):
	delete_entry = sample_match.delete_one( { "_id" : ObjectId(ID) } )
	if delete_entry.deleted_count == 1:
		return make_response( jsonify( {"Entry Status" : "Entry Deleted"} ), 200)
	else:
		  return make_response( jsonify( {"error" : "Invalid Data ID"} ), 404)
	
if __name__ == "__main__":
	app.run(debug=True)