# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect, HttpResponse
from ..login.models import User
# from .models import *
# Create your views here.
def index(request):
    user = User.objects.get(id=request.session['user'])
    context = {
        'Username': user
    }
    return render(request,"spotifyTemplate/index.html",context)
def user(request):
    user = User.objects.get(id=request.session['user'])
    context = {
        'User': user
    }
    return render(request,"spotifyTemplate/user.html",context)
def logout(request):
    request.session.flush()
    return redirect('/')