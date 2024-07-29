Plugins used:
- cypress-file-upload -> To upload files from local through the "Choose file" button
- http-server -> Used to start a server to run the HTML file
- start-server-and-test -> Start server and test in one command

Custom npm commands are in the package.json the same did not work hence the workaround was to have two terminals with one running:
-  npm run start -- --file=task.html  
and the other running
- npx cypress open/run