from rest_framework import generics, mixins, status, response, views
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from api.serializers import *

# class SignUpAPI(APIView):
#     def post(self, request):
#         username = request.data['id']
#         password = request.data['password']
#         userObj = User.objects.create_user(username=username, password=password)
#         userObj.save()
#         tokenObj = Token.objects.create(user=userObj)
#         return Response({"Token": tokenObj.key})



class SignUpAPI(generics.GenericAPIView):
    serializer_class = SignUpUserSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        userObj = serializer.save()
        tokenObj = Token.objects.create(user=userObj)
        return response.Response({"user": SignUpUserSerializer(userObj, context=self.get_serializer_context()).data, "token": tokenObj.key})


class SignInAPI(views.APIView):
    def post(self, request):
        userObj = authenticate(username=request.data.get('username'), password=request.data.get('password'))
        if userObj is not None:
            tokenObj = Token.objects.get(user=userObj)
            return response.Response({"Token": tokenObj.key})
        else:
            return response.Response({f'Wrong ID/PW'}, status=status.HTTP_400_BAD_REQUEST)


class UserInfoGetAPI(views.APIView):
    def get(self, request):
        try:
            tokenObj = Token.objects.get(key=request.auth)
        except Token.DoesNotExist:
            return response.Response({'Invaild Token.'}, status=status.HTTP_400_BAD_REQUEST)
        
        return response.Response({'username': tokenObj.user.username,'is_manager': tokenObj.user.is_staff, 'is_admin':tokenObj.user.is_superuser})


class UserListAPI(mixins.ListModelMixin,generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return self.list(request)

