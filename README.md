# OSAM 두軍두軍 상담소

> **마스터 브랜치에 업데이트가 있다면 `git pull origin master` !!**



* [Project Structure](#Project-Structure)
* [Server setting 방법](#Server setting 방법)
* [Client setting 방법](#Client setting 방법)
* [honeycombo.tk github login 방법](#honeycombo.tk)



<br/><br/>

# Project Structure

```bash
/server # 서버 배포를 위한 파일(ex Dockerfile / sh script) 등이 위치하게 됩니다.
/server/client # Django 서버

/client # React App
```

## 초기 개발환경 세팅 방법

```bash
git clone https://github.com/yukhaejinmi/osam
git checkout -b <task_name>
# 코딩 & add / commit
git push origin <task_name>
```
* branch에 push 후 pull request를 날리면 @leesungbin 이 검토 후, master branch에 merge 하도록 하겠습니다.
* <task_name> : 어떤 작업을 할 것인지에 대한 내용을 간략히 요약하는 한 단어를 사용하면 되겠습니다. 자신의 아이디로 해도 상관 없습니다.
* 마스터 브랜치에 merge 된 작업이 생기면, 자신이 작업하던 브랜치에 `git pull origin master` 명령어를 통해서 업데이트 된 사항을 바로바로 반영해주셔야 merge conflict를 많이 줄일 수 있을 것 같습니다.
<br/><br/>

# Server setting 방법

> using python(3.8.5)
```bash
pip install -r ./server/requirements.txt
cd server/clinic
./manage.py makemigrations
./manage.py migrate
./manage.py loaddata fixture.json
```
> root 계정 : root@ro.ot / root

* (20.09.29.) env 파일을 추가해 놓았고, makemigrations, migrate 하고 실행하면 서버가 실행되겠습니다.
<br/><br/>

# Client setting 방법

* package 설치
```bash
npm install # 혹은 yarn
```

<br/>

* Shell 2개 띄우기
1. `npm start`
2. `npm run relay -- --watch`
- watchman 설치가 필요합니다. [참고](https://facebook.github.io/watchman/docs/install.html)



<br/><br/>

# honeycombo.tk github login 방법

>  [참고](https://github.com/cdr/code-server/issues/1883)

