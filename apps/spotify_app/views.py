# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect, HttpResponse
from ..login.models import User
from .models import Songs
# from .models import *
# Create your views here.
def index(request):
    user = User.objects.get(id=request.session['user'])
    songs = Songs.objects.all()
    context = {
        'Username': user,
        'Song': songs
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

def showTrack(request, track_id):
    print "track id:", track_id
    user = User.objects.get(id=request.session['user'])
    context={
        'track_id': track_id,
        'person' : user
        
    }
    return render(request, "spotifyTemplate/track.html", context)

def likedsongs(request, track_id):
    Song = track_id
    users = User.objects.get(id = request.session['user'])
    songs = Songs.objects.get_or_create(song = track_id)
    songs[0].liked_others.add(users)
    songs[0].save()
    return redirect('/spotify')
def likebutton(request, track_id):
    songs = Songs.objects.get_or_create(song = track_id)
    user = User.objects.get(id = request.session['user'])
    print songs
    context = {
        'Song': songs[0],
        'user': user
    }
    return render(request, "spotifyTemplate/_like.html",context)