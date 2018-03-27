# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect
from models import User
from django.contrib import messages
import bcrypt

firstRun = True

# Create your views here.
def index(request):
    global firstRun
    if firstRun:
        request.session['user'] = 0
        firstRun = not firstRun
    errors = messages.get_messages(request)
    context = {
        'errors': errors
    }
    return render(request, 'login/login.html', context)

def login(request):
    errors = User.objects.login_validator(request.POST)
    if len(errors):
        request.session['user'] = 0
        for error in errors:
            messages.error(request, error, extra_tags="login")
        return redirect('/')
    else:
        user = User.objects.filter(email=request.POST['email'])
        request.session['user'] = user[0].id
        return redirect('/success')

def registration(request):
    errors = messages.get_messages(request)
    context = {
        'errors': errors
    }
    return render(request, 'login/registration.html', context)

def register(request):
    errors = User.objects.registration_validator(request.POST)
    if len(errors):
        for error in errors:
            messages.error(request, error, extra_tags="registration")
        return redirect('/registration')
    else:
        email = request.POST['email']
        password = request.POST['password']
        pwhash = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        name = request.POST['name']
        User.objects.create(
            email = email,
            password = pwhash,
            name = name
        )
        return redirect('/')

def success(request):
    if request.session['user'] > 0:
        return redirect('/spotify')
    else:
        return redirect('/')