#!/bin/bash

# Update package lists
sudo apt-get update

# Install necessary dependencies
sudo apt-get install -y wget apt-transport-https ca-certificates curl gnupg-agent

# Download and install Google Chrome
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | sudo tee /etc/apt/sources.list.d/google-chrome.list
sudo apt-get update
sudo apt-get install -y google-chrome-stable

# Check installed Chrome version
google-chrome --version
