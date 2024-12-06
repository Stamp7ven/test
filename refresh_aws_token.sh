#!/bin/bash

# Request new session token
OUTPUT=$(aws sts get-session-token --duration-seconds 43200)

# Export new credentials as environment variables
export AWS_ACCESS_KEY_ID=$(echo $OUTPUT | jq -r '.Credentials.AccessKeyId')
export AWS_SECRET_ACCESS_KEY=$(echo $OUTPUT | jq -r '.Credentials.SecretAccessKey')
export AWS_SESSION_TOKEN=$(echo $OUTPUT | jq -r '.Credentials.SessionToken')

# Save the credentials to a file for future use
echo "AWS_ACCESS_KEY_ID=$(echo $OUTPUT | jq -r '.Credentials.AccessKeyId')" > ~/.aws/temporary_credentials
echo "AWS_SECRET_ACCESS_KEY=$(echo $OUTPUT | jq -r '.Credentials.SecretAccessKey')" >> ~/.aws/temporary_credentials
echo "AWS_SESSION_TOKEN=$(echo $OUTPUT | jq -r '.Credentials.SessionToken')" >> ~/.aws/temporary_credentials

