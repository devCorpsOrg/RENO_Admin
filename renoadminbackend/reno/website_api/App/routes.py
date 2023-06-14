from App import app, db, bcrypt, login_manager
from flask import request, jsonify
from flask_login import UserMixin, login_user, logout_user, current_user, login_required
from bson import ObjectId
import smtplib
from random import randint


# ================================================= Auth ================================================
class User(UserMixin):
    def __init__(self, user):
        self.id = str(user["_id"])
        self.username = user["usname"]


@login_manager.user_loader
def load_user(user_id):
    users = db["website_api_users"]
    user = users.find_one({"_id": ObjectId(user_id)})
    return User(user) if user else None


@login_manager.unauthorized_handler
def unauthorized():
    return jsonify({"error": "Unauthorized"}), 401


@app.route("/signup", methods=["POST"])
def signup():
    try:
        users = db["website_api_users"]
        req_json = request.json
        usname = req_json["usname"]
        pwd = req_json["pwd"]
        mobile = req_json.get("mobile")
        country = req_json.get("country")

        if users.find_one({"usname": usname}):
            return {"error": "Username already exists."}, 409
        
        hash = bcrypt.generate_password_hash(pwd).decode('utf-8')
        data = {
            "usname": usname,
            "hash": hash,
            "mobile": mobile,
            "country": country
        }

        users.insert_one(data)

        return '', 204
    except KeyError as e:
        return {"error": f"Key Error | {str(e)}"}, 400
    except Exception as e:
        return {"error": f"Server Error | {str(e)}"}, 500


@app.route("/login", methods=["POST"])
def login():
    try:
        users = db["website_api_users"]
        req_json = request.json
        usname = req_json["usname"]
        pwd = req_json["pwd"]
        remember = req_json.get("remember", False)
        user = users.find_one({"usname": usname})
        if user and bcrypt.check_password_hash(user["hash"], pwd):
            login_user(User(user), remember=remember)
            return "", 204
        
        return {"error": "Invalid username or password"}, 401
    except KeyError as e:
        return {"error": f"Key Error | {str(e)}"}, 400
    except Exception as e:
        return {"error": f"Server Error | {str(e)}"}, 500


@app.route("/logout", methods=["GET"])
def logout():
    if current_user.is_authenticated:
        logout_user()
        return "", 204
    return jsonify({"error": "Not logged in."}), 401


@app.route("/forgotpwd", methods=["GET"])
def forgot_pwd():
    try:
        users = db["website_api_users"]
        usname = request.args.get("usname")
        user = users.find_one({"usname": usname})
        if user:
            otp = randint(100000, 999999)
            msg = f"OTP to reset your reno website password is: {otp}"
            msg["Subject"] = "Reset Password - Reno"
            msg["From"] = "partbarse92@gmail.com"
            msg["To"] = usname            
            smtp = smtplib.SMTP("smtp.gmail.com", 587)
            smtp.starttls()
            smtp.login("partbarse92@gmail.com", "xdfrjwaxctwqpzyg")
            smtp.sendmail(usname, usname, msg.as_string())
            smtp.quit()

            users.update_one({"usname": usname}, {"$set": {"otp": otp}})
            return "", 204
        else:
            return {"error": "User doesn't exist."}, 404
    except KeyError as e:
        return {"error": str(e)}, 400
    except Exception as e:
        return {"error": str(e)}, 500


@app.route("/resetpwd", methods=["POST"])
def reset_pwd():
    try:
        users = db["website_api_users"]
        req_json = request.json
        usname = req_json["usname"]
        pwd = req_json["pwd"]
        otp = req_json["otp"]

        user = users.find_one({"usname": usname})
        if not user:
            return {"error": "User doesn't exist."}, 404
        
        if otp == user.get("otp"):
            hash = bcrypt.generate_password_hash(pwd).decode('utf-8')
            users.update_one({"usname": usname}, {"$set": {"hash": hash, "otp": None}})
            return "", 204
        else:
            return {"error": "Invalid OTP."}, 409
    except KeyError as e:
        return {"error": str(e)}, 400
    except Exception as e:
        return {"error": str(e)}, 500


@app.route("/testlogin", methods=["GET"])
@login_required
def test_login():
    return "Login tested and you're logged in."

