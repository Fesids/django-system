from rest_framework import permissions


class UpdateUserPermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.user.is_superuser: #or (request.user.is_superuser and request.user.is_staff)'''
            return True
        return False


    def has_object_permission(self, request, view, obj):

        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user.email == obj.email