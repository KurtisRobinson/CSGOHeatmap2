from flask import Flask, jsonify, make_response, request

app = Flask(__name__)


sample_match = [
  {
    "ID": 1,
    "map": "de_dust2",
    "round": 1,
    "att_side": "Terrorist",
    "vic_side": "Terrorist",
    "hp_dmg": 36,
    "arm_dmg": 0,
    "is_bomb_planted": "FALSE",
    "bomb_site": "",
    "wp": "HE",
    "wp_type": "Grenade",
    "winner_side": "CounterTerrorist",
    "att_pos_x": -130.1585,
    "att_pos_y": 304.0313,
    "vic_pos_x": -130.1585,
    "vic_pos_y": 304.0313,
    "round_type": "PISTOL_ROUND"
  },
  {
    "ID": 2,
    "map": "de_dust2",
    "round": 3,
    "att_side": "Terrorist",
    "vic_side": "CounterTerrorist",
    "hp_dmg": 30,
    "arm_dmg": 15,
    "is_bomb_planted": "FALSE",
    "bomb_site": "",
    "wp": "HE",
    "wp_type": "Grenade",
    "winner_side": "Terrorist",
    "att_pos_x": 203.4764,
    "att_pos_y": 199.6772,
    "vic_pos_x": 644.8077,
    "vic_pos_y": 721.5629,
    "round_type": "ECO"
  },
  {
    "ID": 3,
    "map": "de_dust2",
    "round": 3,
    "att_side": "Terrorist",
    "vic_side": "Terrorist",
    "hp_dmg": 1,
    "arm_dmg": 0,
    "is_bomb_planted": "FALSE",
    "bomb_site": "",
    "wp": "HE",
    "wp_type": "Grenade",
    "winner_side": "Terrorist",
    "att_pos_x": -1121.408,
    "att_pos_y": 1081.837,
    "vic_pos_x": -1121.408,
    "vic_pos_y": 1081.837,
    "round_type": "ECO"
  },
  {
    "ID": 4,
    "map": "de_dust2",
    "round": 4,
    "att_side": "Terrorist",
    "vic_side": "CounterTerrorist",
    "hp_dmg": 2,
    "arm_dmg": 0,
    "is_bomb_planted": "FALSE",
    "bomb_site": "",
    "wp": "HE",
    "wp_type": "Grenade",
    "winner_side": "Terrorist",
    "att_pos_x": 348.4612,
    "att_pos_y": 2087.148,
    "vic_pos_x": 1434.227,
    "vic_pos_y": 2545.21,
    "round_type": "SEMI_ECO"
  },
  {
    "ID": 5,
    "map": "de_dust2",
    "round": 4,
    "att_side": "Terrorist",
    "vic_side": "CounterTerrorist",
    "hp_dmg": 54,
    "arm_dmg": 18,
    "is_bomb_planted": "TRUE",
    "bomb_site": "A",
    "wp": "HE",
    "wp_type": "Grenade",
    "winner_side": "Terrorist",
    "att_pos_x": 1085.885,
    "att_pos_y": 2592.73,
    "vic_pos_x": 387.9654,
    "vic_pos_y": 1770.458,
    "round_type": "SEMI_ECO"
  }]

@app.route("/")
@app.route("/api/v1.0/sample_match", methods=["GET"])
def show_all():
	return make_response( jsonify( sample_match ), 200)

@app.route("/api/v1.0/sample_match", methods=["POST"])
def add_data():
	next_id = sample_match[-1]["ID"] + 1
	new_data = { "ID": next_id,
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
	sample_match.append(new_data)
	return make_response( jsonify( sample_match ), 201)
	
	
@app.route("/api/v1.0/sample_match/<int:ID>", methods=["GET"])
def show_one(ID):
	data_to_return = [ entry for entry in sample_match if entry["ID"] == ID ]
	return make_response( jsonify( data_to_return[0] ), 200)

@app.route("/api/v1.0/sample_match/<int:ID>", methods=["PUT"])
def edit_data(ID):
	for entry in sample_match:
		if entry["ID"] == ID:
				 entry["map"] = request.form["map"]
				 entry["round"] = request.form["round"]
				 entry["att_side"] = request.form["att_side"]
				 entry["vic_side"] = request.form["vic_side"]
				 entry["hp_dmg"] = request.form["hp_dmg"]
				 entry["arm_dmg"] = request.form["arm_dmg"]
				 entry["is_bomb_planted"] = request.form["is_bomb_planted"]
				 entry["bomb_site"] = request.form["bomb_site"]
				 entry["wp"] = request.form["wp"]
				 entry["wp_type"] = request.form["wp_type"]
				 entry["winner_side"] = request.form["winner_side"]
				 entry["att_pos_x"] = request.form["att_pos_x"]
				 entry["att_pos_y"] = request.form["att_pos_y"]
				 entry["vic_pos_x"] = request.form["vic_pos_x"]
				 entry["vic_pos_y"] = request.form["vic_pos_y"]
				 entry["round_type"] = request.form["round_type"]
				 break
	return make_response( jsonify( entry ), 200)	
	
	
@app.route("/api/v1.0/sample_match/<int:ID>", methods=["DELETE"])
def delete_data(ID):
	for entry in sample_match:
		if entry["ID"] == ID:
			sample_match.remove(entry)
			break
	return make_response( jsonify( {} ), 200)	
	
if __name__ == "__main__":
	app.run(debug=True)