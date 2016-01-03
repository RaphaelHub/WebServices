XML Requests/Responses:
=======================

POST /printer/jobs HTTP/1.1

Host: http://localhost:9000

Content-Type: application/xml

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<jobTemplate>
    <text>foobar</text>
</jobTemplate>
```

Response:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<job>
    <completed>false</completed>
    <id>0</id>
    <text>foobar</text>
</job>
```

---

GET /printer/jobs/0 HTTP/1.1

Host: http://localhost:9000

Response:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<job>
    <completed>false</completed>
    <id>0</id>
    <text>foobar</text>
</job>
```

Send another request in after 10 seconds have passed and you will recieve following response:

```xml
<job>
    <completed>true</completed>
    <id>0</id>
    <text>foobar</text>
</job>
```

---

GET /printer HTTP/1.1

Host: http://localhost:9000

Response:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<jobs>
    <status>There are 1 jobs in the queue, 0 of which are completed!</status>
</jobs>
```

Send another request in after 10 seconds have passed and you will recieve following response:

```xml
<jobs>
    <status>There are 1 jobs in the queue, 1 of which are completed!</status>
</jobs>
```

JSON Requests/Responses:
========================

POST /printer/jobs HTTP/1.1

Host: http://localhost:9000

Content-Type: application/json

Accept: application/json

```json
{
    "text": "foobar"
}
```

Response:

```json
{
  "id": 0,
  "text": "foobar",
  "completed": false
}
```

---

GET /printer/jobs/0 HTTP/1.1

Host: http://localhost:9000

Accept: application/json

Response:

```json
{
  "id": 0,
  "text": "foobar",
  "completed": false
}
```

Send another request in after 10 seconds have passed and you will recieve following response:

```json
{
  "id": 0,
  "text": "foobar",
  "completed": true
}
```

---

GET /printer HTTP/1.1

Host: http://localhost:9000

Response:

```json
{
  "status": "There are 1 jobs in the queue, 0 of which are completed!"
}
```

Send another request in after 10 seconds have passed and you will recieve following response:

```json
{
  "status": "There are 1 jobs in the queue, 1 of which are completed!"
}
```
