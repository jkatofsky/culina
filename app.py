from re import L
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
    match = db.ObjectIdField()
    sid = db.StringField()


@app.route('/')
def homepage():
    return app.send_static_file('index.html')


@app.route('/user/create', methods=['POST'])
def create_user():
    data: dict = request.json
    user = User(name=data.get('name'), ingredients=data.get('ingredients'))
    user.save()
    return user.to_json()

# TODO: on disconnect, delete user object and remove it from other users' match field

def find_best_match(user, possible_matches):
    # TODO: @ yu lu
    # find the user with the largest intersection of ingredients
    # if none found with intersection above threshold length, return None
    pass

def find_common_recipies(user1, user2):
    # TODO @ yu lu
    # first, intersect user1.ingredients and user2.ingredients, then use that to query the recipies
    pass

@socketio.on('search-for-match')
def on_search_for_match(user_id):

    user: User = User.objects.get_or_404(pk=user_id)
    user.sid = request.sid
    user.save()

    possible_matches = User.objects(pk__ne=user_id, match__exists=False)
    match = find_best_match(user, possible_matches)

    if not match:
        return

    user.match = match.id
    match.match = user.id
    user.save()
    match.save()

    recipies = find_common_recipies(user, match)

    emit('match', {'match': match.to_json(), 'recipies': recipies}, to=user.sid)
    emit('match', {'match': user.to_json(), 'recipies': recipies}, to=match.sid)


# TODO: chatting feature

if __name__ == "__main__":
    socketio.run(app, debug=True)