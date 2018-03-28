from django.conf.urls import url
from . import views
urlpatterns = [
    url(r'^$', views.index),
    url(r'^logout$',views.logout),
    url(r'^user',views.user),
    url(r'^tracks/(?P<track_id>.[^/]+)/$', views.showTrack)
]