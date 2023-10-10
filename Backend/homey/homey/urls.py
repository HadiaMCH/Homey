from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/equipementmodel/', include('equipementmodel.urls')),
    path('api/authentication/', include('authentication.urls')),
    path('api/commentmodel/', include('commentmodel.urls')),    
    path('api/feedback/', include('feedback.urls')),
    path('api/equipement/', include('equipement.urls')),
    path('api/commentequipement/', include('commentequipement.urls')),
    path('api/failure/', include('failure.urls')),
    path('api/bill/', include('bill.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)