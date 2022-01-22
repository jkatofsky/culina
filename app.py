from flask import Flask, request
from flask_socketio import SocketIO, emit
import traceback
from flask_cors import CORS
from flask_mongoengine import MongoEngine

app = Flask(__name__, static_folder='client/build', static_url_path='/')

# app.config.from_pyfile('config.py')
CORS(app)

db = MongoEngine()
db.init_app(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# TODO: load in the CSV

class User(db.Document):
    name = db.StringField(required=True)
    ingredients = db.ListField(db.StringField(), default=list)
    match = db.ObjectIdField(default=None)


@app.route('/')
def homepage():
    return app.send_static_file('index.html')


# TODO; rethink this? do the search for match on user create all through HTTP
# ONLY using WS for notifying users of match or the chat feature

@app.route('/user/create', methods=['POST'])
def create_user():
    data: dict = request.json
    user = User(name=data.get('name'), ingredients=data.get('ingredients'))
    user.save()
    return user.to_json()

# TODO: on disconnect, delete user object and remove it from other users' match field

@socketio.on('search-for-match')
def on_search_for_match(user_id):
    # TODO
    # get user
    # search other users for those without match field
    # find best match based on ingredients
    # if no suitable match, don't do anything dont do anything
    # for the best match found
        # find recipies best matching common ingredients
        # send both user ids back & send them both recepie list
    pass

# TODO: chatting feature

if __name__ == "__main__":
    socketio.run(app, debug=True)