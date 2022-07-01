from flask import Flask, render_template, request
from flask import redirect
from flask import jsonify
import json
from flaskext.mysql import MySQL
from flask import make_response

app = Flask(__name__)
mysql = MySQL()

app.config['MYSQL_DATABASE_HOST'] 	  = 'localhost'
app.config['MYSQL_DATABASE_PORT'] 	  = 3306
app.config['MYSQL_DATABASE_USER'] 	  = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'pass_root'
app.config['MYSQL_DATABASE_DB'] 	  = 'db_university'

mysql.init_app(app)
app = Flask(__name__)

@app.route('/')
def begin():
	return render_template('begin.html')

@app.route('/index')
def index():
	return render_template('index.html')

@app.route('/index1')
def index1():
	return render_template('index1.html')

@app.route('/index2')
def index2():
	return render_template('index2.html')
	
@app.route('/api/data')
def doGetData():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT annee, count(*) AS n FROM Resultats group by annee")	

	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)
	
@app.route('/api/data2')
def doGetData2():
	
	data = {"annee":[], "datasets":[]}
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT DISTINCT annee FROM resultats")	

	annee_tuple = cursor.fetchall()
	annee_list =  [item[0] for item in annee_tuple]
	data["annee"]=annee_list	

	cursor.execute("SELECT DISTINCT specialite FROM resultats")	

	specialite_tuple = cursor.fetchall()
	specialite_list =  [item[0] for item in specialite_tuple]
	
	for specialite in specialite_list:
		cursor.execute("SELECT count(*) as n  FROM resultats WHERE specialite='"+specialite+"' group by annee")	
		n_tuple = cursor.fetchall()
		n_list =  [item[0] for item in n_tuple]
		data["datasets"].append({"label":specialite, "data":n_list})	
	
	data_JSON = json.dumps(data)	
	return data_JSON 	

@app.route('/api/data3')
def doGetData3():
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("select annee, count(*) as n from resultats where moyenne >= 10 group by annee;")	

	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)

@app.route('/api/data4')
def doGetData4():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT annee, count(*) AS n FROM Resultats WHERE sexe='F' group by annee")	

	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)

@app.route('/api/data5')
def doGetData5():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT annee, count(*) AS n FROM Resultats group by annee")	

	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)

@app.route('/api/data6')
def doGetData6():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("select annee, count(*) as n from resultats where sexe='H' group by annee")	

	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)

@app.route('/api/data7')
def doGetData7():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("select annee, count(*) as n from resultats where specialite='specialite_1' and moyenne>=10 group by annee")	

	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)


#index2.............

@app.route('/api/persons', methods=["GET"])
def selectPersons():
    # Connexion à la BD
    conn = mysql.connect()
    cursor = conn.cursor()
    
    # Requête SQL SELECT
    cursor.execute("SELECT annee, matricule, nom, prenom, sexe, specialite, moyenne from resultats")
    
    # Préparer le fichier JSON
    data = cursor.fetchall()
    row_headers=[x[0] for x in cursor.description]
    
    cursor.close()
    
    json_data=[]
    for result in data:
        json_data.append(dict(zip(row_headers,result)))
        
    # Envoie de données sous format JSON
    return make_response(jsonify(json_data), 200)    

#main
if __name__ == '__main__':
	app.run(debug=True, port=5000)
	