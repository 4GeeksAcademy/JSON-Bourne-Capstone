from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    posts = db.relationship('Post', backref='author')
    favorites = db.relationship('Favorites', backref='user')
    comments = db.relationship('Comment', backref='user')


    def serialize (self):
        return {
            'id': self.id,
            'username': self.username,
            'posts': [post.id for post in self.posts],
            'favorites':  [favorite.serialize() for favorite in self.favorites],
            'comments': [comment.id for comment in self.comments]
            }

    def __repr__(self):
        return f'<User {self.username}>'

    def to_dict(self):
        return {
            "user_id": self.id,
            "username": self.username
        }

class Post(db.Model):
    __tablename__ = 'post'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    favorites = db.relationship('Favorites', backref='post')
    comments = db.relationship('Comment', backref='post')
    images = db.relationship('Image', backref='post')

    def serialize (self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'created_at': self.created_at,
            'author_id': self.author_id,
            'favorites': self.favorites, 
            'comments': self.comments,  
            'images': self.images  
        }
    
     
class Image(db.Model):
    __tablename__ = 'image'
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(100), nullable=False)
    Post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    
    def serialize (self):
        return {
            'id': self.id,
            'url': self.url,
            'post_id': self.post_id
        }


class Favorites(db.Model):
    __tablename__ = 'favorites'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))
    image_url = db.Column(db.String(500))

    def serialize (self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'post_id': self.post_id,
            'image_url': self.image_url
        }


class Comment(db.Model):
    __tablename__ = 'comment'
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.Date, default=datetime.utcnow().date())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'))

    def __repr__(self):
        return f'<Comment {self.text}>'

    def serialize(self):
        return {
            'id': self.id,
            'text': self.text,
            'created_at': self.created_at,
            'user_id': self.user_id,
            'post_id': self.post_id,
        }
