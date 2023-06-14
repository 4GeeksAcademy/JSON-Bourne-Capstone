"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, Favorites
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import JWTManager, jwt_required
from flask_jwt_extended import get_jwt_identity

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


@api.route('/login', methods=['POST'])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    # Perform authentication
    user = User.query.filter_by(username=username).first()
    if user is None or not user.check_password(password):
        return jsonify({"msg": "Incorrect email or password"}), 401

    # Generate access token
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/users', methods=['GET'])
@jwt_required()
def get_user_(id):
    user_id = get_jwt_identity()
# decorator on private routes
    user = User.query.filter_by(id=user_id).first()
    #serialized_users = [user.serialize() for user in user]
    if not user :
        return jsonify ({'message': 'user not found'})
    return jsonify(user.serialize())

@api.route('/users/favorites', methods=['POST'])
@jwt_required()
def add_favorite():
    data = request.get_json()
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    if not user :
        return jsonify ({'message': 'user not found'})
    favorite = Favorites(
        user_id=user_id,
        post_id=data['post_id'],
    )
    db.session.add(favorite)
    db.session.commit()
    return "ADD SUCCESS"

@api.route('/users/favorites/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(id):
    favorite = Favorites.query.get(id)
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    if not user :
        return jsonify ({'message': 'user not found'})
    if favorite.user_id==user_id:
        db.session.delete(favorite)
        db.session.commit()
        return "DELETE SUCCESS"
    return "Favorite not found"