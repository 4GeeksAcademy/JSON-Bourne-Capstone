"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, session
from api.models import db, User, Post, Favorites
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity


api = Blueprint('api', __name__)
app = Flask(__name__)


@api.route('/signup', methods=['POST'])
def signup():
    # Retrieve request data
    username = request.json.get('username')
    password = request.json.get('password')

    # Check if the email is already registered
    if User.query.filter_by(username=username).first():
        return jsonify(message='Username already registered'), 200

    # Create a new user object
    new_user = User(username=username, password=password)

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify(message='Failed to register user'), 200

    return jsonify(message='User registered successfully'), 200


@api.route('/login', methods=['POST'])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    # Perform authentication
    user = User.query.filter_by(username=username).first()

    if user is None or not password == user.password:
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


@api.route('/users/<int:id>', methods=['GET'])
@jwt_required()
def get_user_(id):
    user = User.query.filter_by(id=id).first()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    stored_token = session.get('access_token')
    request_token = request.headers.get('Authorization', '').split('Bearer ')[1]
    if stored_token != request_token:
        return jsonify({'message': 'Invalid access token'}), 401

    return jsonify(user.serialize()), 200


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

        return "SUCCESS"
    return "Favorite not found"


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user_username = get_jwt_identity()
    user = User.query.filter_by(username=current_user_username).first()

    request_token = request.headers.get('Authorization')

    if request_token and request_token.startswith('Bearer '):
        stored_token = request_token.split('Bearer ')[1]

    if stored_token == session.get('access_token'):
        return jsonify({"username": user.username}), 200
    else:
        return jsonify(message='You are not authorized to view this page'), 401


if __name__ == "__main__":
    api.run()


