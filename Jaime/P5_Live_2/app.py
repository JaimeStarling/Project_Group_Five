from flask import Flask, render_template, redirect, request, jsonify
import json
import pandas as pd

# Crflaskeate an instance of Flask
app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
df=pd.read_csv('Prediction_website.csv')


# Route to render index.html template using data from Mongo
@app.route("/")
def home():
    # Return template and data
    return render_template("index.html")

@app.route("/about_us")
def about_us():
    # Return template and data
    return render_template("about_us.html")

@app.route("/sql_movie")
def sql_movie():
    # Return template and data
    return render_template("sql_movie.html")

@app.route("/credits")
def credits():
    # Return template and data
    return render_template("credits.html")

@app.route("/tableau")
def tableau():
    # Return template and data
    return render_template("tableau.html")

@app.route("/tableau2")
def tableau2():
    # Return template and data
    return render_template("tableau2.html")

@app.route("/tableau3")
def tableau3():
    # Return template and data
    return render_template("tableau3.html")

@app.route("/movie_pred")
def movie_pred():
    # Return template and data
    return render_template("movie_pred.html")

@app.route("/makePredictions", methods=["POST"])
def make_predictions():
    content = request.json["data"]
    print(content)
    movie=content["movie"]
    rtn=df.loc[df.movie_title==movie]
    return(jsonify({"ok": True, "data":json.loads(rtn.to_json(orient="records"))}))

@app.route("/getmovies", methods=["GET"])
def get_movies():
    movies = df.movie_title.to_list()
    
    return(jsonify({"ok": True, "movies":movies}))


#############################################################

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, max-age=0"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    return r

if __name__ == "__main__":
    app.run(debug=True)
