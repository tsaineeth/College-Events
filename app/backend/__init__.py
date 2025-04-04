from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from backend.config import Config
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)

    db.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)

    from backend.routes import auth
    from backend.routes import users
    from backend.routes import comments
    app.register_blueprint(auth.bp)
    # app.register_blueprint(users.bp)
    # app.register_blueprint(comments.bp)

    return app