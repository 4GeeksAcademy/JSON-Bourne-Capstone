from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True)
    password = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    #firstname = db.Column(db.String(30), unique=False, nullable=False)
    #lastname = db.Column(db.String(30), unique=False, nullable=False)
    favorites = db.relationship("Favorites", back_populates="user")
    posts = db.relationship("Post", back_populates="author")

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, it's a security breach
        }

class Post(db.Model):
    __tablename__ = "post"
    id = db.Column(db.Integer, primary_key=True)
    file_name = db.Column(db.String(30), nullable=False)
    name_of_creation = db.Column(db.String(30), unique=True, nullable=False)
    media_type = db.Column(db.String(30), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    description = db.Column(db.String(30), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    favorites = db.relationship("Favorites", back_populates="post")
    author = db.relationship("User", back_populates="posts")
    

class Favorites(db.Model):
    __tablename__ = "favorite"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    post_id = db.Column(db.Integer, db.ForeignKey("post.id"))
    user = db.relationship("User", back_populates="favorites")
    post = db.relationship("Post", back_populates="favorites")
