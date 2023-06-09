"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, make_response, jsonify, url_for, Blueprint
from api.models import db, User, Post, Favorites
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash

api = Blueprint('api', __name__)
app = Flask(__name__)

@app.route('/register', methods=['POST'])
def signup_user():
    data = request.get_json()

    hashed_password = generate_password_hash(data['password'], method='sha256')

    new_user = User(username=data['username'], password=hashed_password)
    
    # checking if that user already exists
    existing_user = User.query.filter_by(username=data['username']).first()
    if existing_user:
        return jsonify({'message': 'User already exists!'}), 409  # HTTP status code for conflict

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'registered successfully'}), 201  # HTTP status code for created


@app.route('/login', methods=['POST'])
def login_user(): 
    auth = request.authorization
    if not auth or not auth.username or not auth.password:  
        return make_response('could not verify', 401, {'WWW.Authentication': 'Basic realm: "login required"'})    
    
    user = next((x for x in users if x.username == auth.username), None)
    if not user:
        return make_response('could not verify', 401, {'WWW.Authentication': 'Basic realm: "login required"'})
    
    if check_password_hash(user.password, auth.password):  
        token = jwt.encode({'public_id': user.username, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
        return jsonify({'token' : token.decode('UTF-8')})

    return make_response('could not verify',  401, {'WWW.Authentication': 'Basic realm: "login required"'})


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200