from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),
    path('register/', views.UserRegistration.as_view(), name='user-registration'),    
    path('login', views.Login.as_view(), name='login'),
    path('users-by-email/<str:email>/', views.GetUserByEmail.as_view(), name='user-by-email'),
    path('delete-all-users/', views.DeleteAllUsers.as_view(), name='delete-all-users'),
    path('logout/', views.Logout.as_view(), name='logout'),
    path('user-infos/', views.GetUserInfos.as_view(), name='get-user-infos'),
    path('update-profile/', views.UpdateUserProfile.as_view(), name='update-profile'),
]
