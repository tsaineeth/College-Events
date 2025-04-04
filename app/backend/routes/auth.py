from flask import Blueprint, jsonify, request, flash
from flask_login import login_user

from backend import db
from backend.models import Users

bp = Blueprint('auth', __name__, url_prefix="/auth")

@bp.route('/login', methods=["POST"])
def login():

    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = Users.query.filter_by(email=email).first()
    if user and user.check_password(password):
        return jsonify({"message": "Login route works"})
    else:
        return jsonify({"error": "Invalid email or password"}), 401


@bp.route('/signup', methods=["POST"])
def signup():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if Users.query.filter((Users.email == email)).first():
        return jsonify({'message': 'User already exists'}), 400

    new_user = Users(name=name, email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201