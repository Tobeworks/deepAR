#set project
gcloud config set project tw-01-382310
#set region
gcloud config set run/region europe-west4
#deploy to gcloud
gcloud run deploy catrice-v2 --source .