# strbot

Repository contains source code of simple chat bot to demonstrate capabilities for CTR specific needs.

This is also a demonstration of GCP Functions capabilities along with power of Chatbots.
## TODO

## Deployment

```gcloud beta functions deploy webhook --runtime nodejs8 --trigger-http```

## Testing

### External:

 ```curl -v -X POST "https://us-central1-ctrbot.cloudfunctions.net/webhook/handler?anything```

### Local:

 ```curl -X POST "localhost:1337/handler"```

## Dependencies
