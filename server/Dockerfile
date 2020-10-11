FROM python:3

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /server
RUN pip install --upgrade pip
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY clinic/clinic ./clinic
COPY deploy.env ./clinic/.env
COPY clinic/gql ./gql
COPY clinic/api ./api
COPY clinic/manage.py ./
COPY clinic/schema.py ./

RUN python manage.py makemigrations
RUN python manage.py migrate
RUN python manage.py collectstatic
# for dev - fake data
COPY clinic/fixture.json ./
RUN python manage.py loaddata fixture.json

RUN ls -lah
CMD uwsgi --http :$PORT --module clinic.wsgi --static-map /static=/static