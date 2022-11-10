from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_login import LoginManager, UserMixin,login_user
import os



# App initialization
app = Flask(__name__)
directory = os.path.abspath(os.path.dirname(__file__))

# Database connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+os.path.join(directory, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# DB initialization 
db = SQLAlchemy(app)

ma = Marshmallow(app)

login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(200))
    password = db.Column(db.String(200))

    def __init__(self,name,email,password):
        self.name = name
        self.email = email
        self.password = password

    def is_authenticated(self):
        return True

    def is_active(self):   
        return True           

    def is_anonymous(self):
        return False          

    def get_id(self):         
        return str(self.id)

with app.app_context():
    db.create_all()

#User Schema
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id','name','email','password')

user_schema = UserSchema()
users_schema = UserSchema(many=True)

@app.route('/user/signup' , methods=['POST'])
def add_user():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']

    new_user = User(name,email,password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"statusCode" : 200})


@app.route('/user/signin', methods = ['POST'])
def login():
    emailN = request.json['email']
    password = request.json['password']
    print(emailN)
    print(password)
    user = User.query.filter_by(email=emailN)
    print(user)
    login_user(user)





if __name__ == '__main__':
    app.run(debug=True)