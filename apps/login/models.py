# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
import bcrypt
import re
import datetime

emailRegex = re.compile(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")

# Create your models here.
class UserManager(models.Manager):
    def login_validator(self, postData):
        errors = []
        user = User.objects.filter(email=postData['email'])
        if not len(user):
            errors.append("User not found in the database.")
        else:
            db_password = user[0].password
            entered_password = postData['password']
            if not bcrypt.checkpw(entered_password.encode(), db_password.encode()):
                errors.append("Invalid password.")
        return errors
    def registration_validator(self, postData):
        errors = []
        if not emailRegex.match(postData['email']):
            errors.append("Email improperly formatted.")
        if len(User.objects.filter(email=postData['email'])):
            errors.append("Email already found in database.")
        if len(postData['password']) < 8:
            errors.append("Password must be at least 8 characters long.")
        if not postData['password'] == postData['confirm']:
            errors.append("Password and password confirmation do not match.")
        if len(postData['name']) < 4:
            errors.append("Name must be at least 4 characters.")
        if not postData['name'].isalpha():
            errors.append("Name must use alphabetical characters only.")
        return errors

class User(models.Model):
    email = models.CharField(max_length=55)
    password = models.CharField(max_length=55)
    name = models.CharField(max_length=55)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    objects = UserManager()