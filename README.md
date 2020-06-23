# Message of Protest

We made this application to make it easy to send emails to local representatives, to pressure them into 
defunding and reforming local police departments.  Black Lives Matter.

We're looking for help.  Please reach out if you'd like to get involved!  messageofprotest@gmail.com

Some specific people we'd love to have:
* coders
* designers
* activists
* marketers

## Getting Started

1. npm install
2. npm run serve
3. Open up `localhost:8080`
4. You're good to go!

## We use VueJS

If you're not familar, check out the intro.  I like it more than React:
https://vuejs.org/v2/guide/

## Disable Google Analytics

This can be useful to avoid polluting the click tracking.  It's automatically disabled when deving on localhost, but now it can also be disabled when visiting the main site from your browser.

To disable, navigate here: https://messageofprotest.com/#/?enable_google_analytics=false

It will stay disabled, and as long is it is disabled you will be notified.

To re-enable: https://messageofprotest.com/#/?enable_google_analytics=true

### Our CI Pipeline

We use Github Actions for continuous integration.

On push to `master` branch, the changes will be deployed and live within a few minutes at www.messageofprotest.com

On push to `staging` branch, the staging deploy will be live at www.messageofprotest.com/staging/

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
