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
COPY clinic/manage.py ./
COPY clinic/schema.py ./
# RUN ["python", "--vesrion"]
RUN python manage.py makemigrations
RUN python manage.py migrate
RUN python manage.py collectstatic
# RUN ["python", "manage.py","loaddata", "./ingredients/fixtures/ingredients.json"]
RUN ls -lah
CMD uwsgi --http :$PORT --module clinic.wsgi --static-map /static=/static