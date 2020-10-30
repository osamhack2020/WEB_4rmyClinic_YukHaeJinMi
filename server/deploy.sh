# cd && ./manage.py dumpdata > fixture.json && cd ../
docker-compose build && \
docker-compose push && \
gcloud --project=pitapat run deploy clinic \
--image gcr.io/pitapat/clinic \
--platform managed \
--region asia-northeast1
