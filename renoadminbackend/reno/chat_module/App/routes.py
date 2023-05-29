from flask import Flask, request
from App import app
from App.models import User
from App import db
from flask import render_template, redirect, url_for, flash, request, session, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from pymongo import MongoClient
import json
from App import bcrypt
from flask import Response
import re
import io
import csv
import os
import jwt
import smtplib
from email.mime.text import MIMEText
from werkzeug.utils import secure_filename
import random
from datetime import date
from datetime import datetime

# -------------------------------------------     Chat Module      ---------------------------------------------------------


@app.route("/createticket", methods=["POST"])
def createticket():
    try:
        tickets_db = db["tickets_db"]
        data = request.get_json()
        today = date.today()
        now = datetime.now()
        date1 = today.strftime("%d-%m-%Y")
        time = now.strftime("%H:%M:%S")
        tid = random.getrandbits(32)
        cid = random.getrandbits(32)
        data1 = {
            "tid": tid,
            "metadata": {
                "usname": data['usname'],
                "subj": data["subj"],
                "uid": int(data['uid']),
                "status": "open"
            },
            "msgs": [{
                "cid": cid,
                "msg": data["msg"],
                "date": date1,
                "time": time,
                "role":data["role"]
            }]
        }
        tickets_db.insert_one(data1)
        return json.dumps({'success': True, "tid": tid}), 200, {'ContentType': 'application/json'}
    except Exception as e:
        return json.dumps({'success': False, "error": e}), 200, {'ContentType': 'application/json'}


@app.route("/getticket", methods=["GET", "POST"])
def getticket():
    try:
        tickets_db = db["tickets_db"]
        user_db = db["renoadmin_apis_userdetails"]
        data = request.get_json()
        tid = int(data['tid'])
        uid = data['uid']
        if tickets_db.find_one({"tid": tid}) and user_db.find_one({"uid": uid}):
            find_data = tickets_db.find_one({"tid": tid})
            user_info = user_db.find_one({"uid": uid})
            if user_info["role"] == "admin":
                new_metadata = {
                    "usname": find_data["metadata"]["usname"],
                    "subj": find_data["metadata"]["subj"],
                    "uid": find_data["metadata"]["uid"],
                    "status": "pending"
                }
                tickets_db.update_one(
                    {"tid": tid}, {"$set": {"metadata": new_metadata}})
            find_data = tickets_db.find_one({"tid": tid})
            data1 = {
                "metadata": find_data["metadata"],
                "msgs": find_data["msgs"]
            }
            return json.dumps({'success': True, "data": data1}), 200, {'ContentType': 'application/json'}
        else:
            return json.dumps({'success': False, "error": "Ticket not found"}), 200, {'ContentType': 'application/json'}
    except Exception as e:
        return json.dumps({'success': False, "error": e}), 200, {'ContentType': 'application/json'}
    

@app.route("/getticketlist", methods=["GET"])
def getticketlist():
    try:
        tickets_db = db["tickets_db"]
        user_db = db["renoadmin_apis_userdetails"]
        all_data = []
        if tickets_db.find_one({}):
            find_data = tickets_db.find({})
            for dt in find_data:
                uid = dt["metadata"]["uid"]
                uid = str(uid)
                try:
                    user_info = user_db.find_one({"uid":uid})
                    if user_info:
                        pic_url = user_info["pic"]
                        pic_url = str("http://139.59.236.50/Renoadmin/"+pic_url)
                        dt["metadata"]["pic"] = pic_url
                        data1 = {
                            "tid": dt["tid"],
                            "metadata": dt["metadata"],
                            "msgs": dt["msgs"]
                        }
                        all_data.append(data1)
                    else:
                        pass
                except:
                    pass
            return json.dumps({'success': True, "data": all_data}), 200, {'ContentType': 'application/json'}
        else:
            return json.dumps({'success': False, "error": "Ticket not found"}), 200, {'ContentType': 'application/json'}
    except Exception as e:
        return json.dumps({'success': False, "error": e}), 200, {'ContentType': 'application/json'}
    
@app.route("/replyticket", methods=["POST"])
def replyticket():
    try:
        tickets_db = db["tickets_db"]
        user_db = db["renoadmin_apis_userdetails"]
        data = request.get_json()
        tid = int(data['tid'])
        uid = data["uid"]
        if tickets_db.find_one({"tid":tid}) and user_db.find_one({"uid":uid}):
            find_data = tickets_db.find_one({"tid":tid})
            user_info = user_db.find_one({"uid":uid})
            prev_msgs = find_data["msgs"]
            new_msg = {
                "cid":random.getrandbits(32),
                "msg": data["msg"],
                "date":data["date"],
                "time":data["time"],
                "role":user_info["role"],
            }
            prev_msgs.append(new_msg)
            tickets_db.update_one(
                    {"tid": tid}, {"$set": {"msgs": prev_msgs}})
            return json.dumps({'success': True, "data": new_msg}), 200, {'ContentType': 'application/json'}
        else:
            return json.dumps({'success': False, "error": "Ticket not found"}), 200, {'ContentType': 'application/json'}
    except Exception as e:
        return json.dumps({'success': False, "error": e}), 200, {'ContentType': 'application/json'}
    
@app.route("/closeticket", methods=["GET", "POST"])
def closeticket():
    try:
        tickets_db = db["tickets_db"]
        user_db = db["renoadmin_apis_userdetails"]
        data = request.get_json()
        tid = int(data['tid'])
        if tickets_db.find_one({"tid": tid}):
            find_data = tickets_db.find_one({"tid": tid})
            new_metadata = {
                "usname": find_data["metadata"]["usname"],
                "subj": find_data["metadata"]["subj"],
                "uid": find_data["metadata"]["uid"],
                "status": "solved"
            }
            tickets_db.update_one(
                {"tid": tid}, {"$set": {"metadata": new_metadata}})
            find_data = tickets_db.find_one({"tid": tid})
            data1 = {
                "metadata": find_data["metadata"],
                "msgs": find_data["msgs"]
            }
            return json.dumps({'success': True, "data": data1}), 200, {'ContentType': 'application/json'}
        else:
            return json.dumps({'success': False, "error": "Ticket not found"}), 200, {'ContentType': 'application/json'}
    except Exception as e:
        return json.dumps({'success': False, "error": e}), 200, {'ContentType': 'application/json'}
