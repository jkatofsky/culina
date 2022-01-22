from re import L
from flask import Flask, request
from flask_socketio import SocketIO, emit
import traceback
from flask_cors import CORS
from flask_mongoengine import MongoEngine

#for recipe recommandation
import pandas as pd
import ast

app = Flask(__name__, static_folder='client/build', static_url_path='/')

# app.config.from_pyfile('config.py')
CORS(app)

db = MongoEngine()
db.init_app(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# load in the CSV
RECIPES = pd.read_csv("quick_health_meals.csv")

class User(db.Document):
    name = db.StringField(required=True)
    ingredients = db.ListField(db.StringField(), default=list)
    match = db.ObjectIdField(default=None)
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

def find_best_match(user, possible_matches, INGRED_SIMIL_THRESHOLD = 3):
    # TODO: @ yu lu
    # find the user with the largest intersection of ingredients
    # if none found with intersection above threshold length, return None
    best_match = None
    max_nb = 0

    for m in possible_matches:
        nb_same_ingred = len(set(userA.ingredients).intersection(set(m.ingredients)))
        if nb_same_ingred >= INGRED_SIMIL_THRESHOLD and nb_same_ingred > max_nb:
            best_match = m
            max_nb = nb_same_ingred

    return best_match

def find_common_recipies(userA, userB, RECIPE_INGRED_THRESHOLD = 2):
    # TODO @ yu lu
    # first, intersect user1.ingredients and user2.ingredients, then use that to query the recipies
    common_ingredients = list(set(userA.ingredients).intersection(set(userB.ingredients)))

    # Returns filter with the number of common ingredients each recipe contains
    preliminary_filter = RECIPES.ingredients.apply(lambda x: np.sum([*map(lambda l: l in x, common_ingredients)]))
    preliminary_recipes = RECIPES[preliminary_filter > RECIPE_INGRED_THRESHOLD]
    preliminary_recipes = preliminary_recipes.to_dict("records")

    # sort by the number of possible missing ingredients, suggesting the recipes with lowest nb
    if len(preliminary_recipes) > 0:
        for r in preliminary_recipes:
            recipe_ingred = set(ast.literal_eval(r["ingredients"]))

            possible_missing_A = recipe_ingred.difference(set(userA.ingredients))
            possible_missing_B = recipe_ingred.difference(set(userB.ingredients))

            total_possible_missing = len(possible_missing_A) + len(possible_missing_B)
            r["total_possible_missing"] = total_possible_missing

        newlist = sorted(preliminary_recipes, key=lambda d: d['total_possible_missing'])
        top_3 = newlist[:3]

        #format the recommendations
        final_recs = []
        for t in top_3:
            rec = {
                "name": t["name"] #str; example: "Noodles With Eggplants and Mushrooms"
                "ingredients": ast.literal_eval(t["ingredients_raw_str"]) #list of str, each string = ingredient + its quantity
                "instructions": ast.literal_eval(t["steps"]) #list of str, each string = step in cooking the dish
            }

            final_recs.append(rec)
        return final_recs
    else:
        return []  #display something like "no recipe in the dataset, want to create one with your match?"

# TODO: test this
@socketio.on('search-for-match')
def on_search_for_match(user_id):

    user: User = User.objects.get_or_404(pk=user_id)
    user.sid = request.sid
    user.save()

    possible_matches = User.objects(pk_ne=user_id, match=None)
    match = find_best_match(user, possible_matches)
    if not match:
        return
    recipies = find_common_recipies(user, match)

    emit('match', match, recipies, to=user.sid)
    emit('match', user, recipies, to=match.sid)


# TODO: chatting feature

if __name__ == "__main__":
    socketio.run(app, debug=True)