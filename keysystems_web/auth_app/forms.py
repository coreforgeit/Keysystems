from django import forms


# проверка инн
class AuthBaseForm(forms.Form):
    inn = forms.IntegerField()


# проверка инн + почта
class AuthUserForm(forms.Form):
    inn = forms.IntegerField()
    email = forms.EmailField()


# проверка пароля
class PasswordForm(forms.Form):
    checkbox = forms.BooleanField(required=False)
    password = forms.CharField()


# форма регистрации
class RegistrationForm(forms.Form):
    inn = forms.IntegerField()
    email = forms.CharField()
    fio = forms.CharField()
    tel = forms.CharField()
    reg_progr = forms.CharField(empty_value='1')

'''
2024-07-10 15:49:41 <QueryDict: {'csrfmiddlewaretoken': ['Lgu0Ze4EmLNwFrqrRa94TE3bTKkBKLdP0fDaibD09LEChRAzhtXbLIkdTytlubx4'], 
'inn': ['5555'], 'reg_progr': [''], 'email': ['ggggg@fffff'], 'fio': ['fggg'], 'tel': ['55555']}
'''

    # class Meta:
    #     model = UserKS
    #     fields = ('inn', 'email', 'full_name', 'phone')
