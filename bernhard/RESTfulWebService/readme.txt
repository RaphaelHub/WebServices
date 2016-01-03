POST http://localhost:9000/printer/jobs HTTP/1.1
Content-Type: application/xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<jobTemplate>
    <text>foobar</text>
</jobTemplate>

Response:
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<job>
    <completed>false</completed>
    <id>0</id>
    <text>foobar</text>
</job>


GET http://localhost:9000/printer/jobs/0 HTTP/1.1

Response:
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<job>
    <completed>false</completed>
    <id>0</id>
    <text>foobar</text>
</job>

Send another request in after 10 seconds have passed and you will recieve following response:
<job>
    <completed>true</completed>
    <id>0</id>
    <text>foobar</text>
</job>


GET http://localhost:9000/printer HTTP/1.1

Response:
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<jobs>
    <status>There are 1 jobs in the queue, 0 of which are completed!</status>
</jobs>

Send another request in after 10 seconds have passed and you will recieve following response:
<jobs>
    <status>There are 1 jobs in the queue, 1 of which are completed!</status>
</jobs>
