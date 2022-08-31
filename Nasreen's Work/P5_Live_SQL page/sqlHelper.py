import pandas as pd
import datetime
import time
import numpy as np
from sqlalchemy import create_engine, inspect

class SQLHelper():
    def __init__(self):
        self.database_path = "mojo_update.sqlite"
        self.conn_string = f"sqlite:///{self.database_path}"
        # Create an engine that can talk to the database
        self.engine = create_engine(self.conn_string)

    def getDataFromDatabase(self, genre, min_budget, max_budget, release_date, mpaa):
        query = f"""
                SELECT 
                m.movie_id,m.title,mp.mpaa,d.director,m.main_actor_1,m.main_actor_2,m.main_actor_3,m.main_actor_4,
                m.domestic,m.budget,
                g.genre_1,m.runtime,m.release_date
                FROM 
                movies_data as m
                INNER JOIN genre_details as g ON m.genre_id = g.genre_id
                INNER JOIN director_details as d ON m.director_id = d.director_id
                INNER JOIN mpaa_details as mp ON m.mpaa_id = mp.mpaa_id
                where 
                g.genre_1 in ({genre}) and 
                m.release_date >= ('{release_date}') and 
                m.budget >= {min_budget} and m.budget <= {max_budget} and mp.mpaa in ({mpaa})
                order by m.title; 
                """
        print(query)
        df = pd.read_sql(query, con=self.engine)
        return df
