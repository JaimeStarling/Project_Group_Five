
import pandas as pd
import datetime
import time
import pickle
import numpy as np
from sqlalchemy import create_engine, inspect

class SQLHelper():
    def __init__(self):
        self.database_path = "mojo_update.sqlite"
        self.conn_string = f"sqlite:///{self.database_path}"

        # Create an engine that can talk to the database
        self.engine = create_engine(self.conn_string)

    def getDataFromDatabase(movie_title):

        query = f"""
    SELECT 
    m.title,
    mp.mpaa,
    m.main_actor_1,m.main_actor_2,m.budget,m.release_date,
    d.director,
    g.genre_1
    FROM 
   movies_data as m
    INNER JOIN mpaa_details as mp ON m.mpaa_id = mp.mpaa_id
    INNER JOIN genre_details as g ON m.genre_id = g.genre_id
    INNER JOIN director_details as d ON m.director_id = d.director_id
    where m.title in ({movie_title});
   
    """
        print(query)

        df = pd.read_sql(query, con=self.engine)

        return df





