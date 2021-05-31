# website to nakama training

## setup :
### docker install :
- install docker 
- create env/local.env with params

```dotenv
    EMAIL_SENDER=''
    EMAIL_PASSWORD=''
    NAME='email-sender'
    EMAIL='dev@mail.com'
```
- build docker :
```shell
$  docker-compose -f dev.docker-compose.yml build
```

### nodejs install : 
- install nodejs version > 15

```shell
$ npm i
```
add in your bash profile
```dotenv
    EMAIL_SENDER=''
    EMAIL_PASSWORD=''
    NAME='email-sender'
    EMAIL='dev@mail.com'
```


## run app
### run with docker:
```shell
$  docker-compose -f dev.docker-compose.yml up
```

### run with nodejs:
```shell
$  npm run dev
```

## settting app :
### configurate gmail sender:

#### Step 1:

go here https://myaccount.google.com/lesssecureapps and enable for less secure apps. If this does not work then

#### Step 2:

go here https://accounts.google.com/DisplayUnlockCaptcha and enable/continue and then try.

(maybe works without step 1)

#### Step 3:

create env/local.env
and Add credential with email and password on params EMAIL_SENDER and EMAIL_PASSWORD
like this :

```dotenv
EMAIL_SENDER='toto@gmail.com'
EMAIL_PASSWORD='Fr5Tg*B'
NAME='email-sender'
EMAIL=''
```

