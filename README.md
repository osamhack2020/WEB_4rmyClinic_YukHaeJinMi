# OSAM 두軍두軍 상담소

## Project Structure
```bash
/server # 서버 배포를 위한 파일(ex Dockerfile / sh script) 등이 위치하게 됩니다.
/server/client # Django 서버

/client # React App
```

**`.gitignore` 파일 내부에는 package 관련 파일/폴더 & 기타 쓸모없는 파일/폴더 & Security 관련 위험이 있는 파일이 포함되어 있습니다.<br/>이들은 Github에 업로드 되지 않기 때문에, 이 repository 자체를 clone 한다고 해서 바로 실행할 수 없습니다.**
<br/><br/>

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

## Server setting 방법
> using python(3.8.5)
```bash
pip install -r ./server/requirements.txt
cd server/clinic
./manage.py makemigrations
./manage.py migrate
# ./manage.py createsuperuser # admin 계정이 필요한 경우
# ./manage.py loaddata fixture.json # 곧 가짜 data를 만들어서 제공할 계획입니다.
```

<br/><br/>

## Client setting 방법
* package 설치
```bash
npm install # 혹은 yarn
```

<br/>

* Shell 2개 띄우기
1. `npm start`
2. `npm run relay -- --watch`
- watchman 설치가 필요합니다. [참고](https://facebook.github.io/watchman/docs/install.html)
