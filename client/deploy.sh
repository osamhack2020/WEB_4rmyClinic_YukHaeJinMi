cd react && npm run build && \
cd .. && docker-compose build && \
docker-compose push && \
gcloud --project=pitapat run deploy client --image gcr.io/pitapat/client --platform managed --region asia-northeast1
