# Super simple run file so I don't have to start 2 cmd's each time I want to run the dev project

Write-Information "Running 'npm run devbatch'"
Start-Process npm -ArgumentList "run", "devbatch"
Write-Information "Running 'npm run devweb'"
Start-Process npm -ArgumentList 'run', 'devweb'

