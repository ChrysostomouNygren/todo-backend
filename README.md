# Todo backend

School assignment for spring 2022, for the course Webserver & Databaser.\
This is a vanilla node backend server, no database.

## How to use:

### Get all of the todos:

> `fetch('https://localhost:4000/todos')`\
> ` .then(res=>res.json())`\
> ` .then(json=>console.log(json))`

### Get single todo:

> `fetch('https://localhost:4000/todos/1')`\
> ` .then(res=>res.json())`\
> ` .then(json=>console.log(json));`

### Post new todo:

> `fetch("http://localhost:4000/todos", {`\
> ` method: "POST",`\
> ` body: JSON.stringify(`\
> `{`\
> ` task: "New todo"`\
> ` }),`\
> ` headers: {`\
> ` "Content-Type": "application/json"`\
> `}});`

### Edit todo:

> `fetch("http://localhost:4000/todos/1", {`\
> `method: "PUT",`\
> `body: JSON.stringify(`\
> `{`\
> `id: 1337,`\
> `task: "Edited todo",`\
> `finished: false`\
> `}),`\
> `headers: {`\
> `"Content-Type": "application/json"`\
> `}});`

### Edit finished:

> `fetch("http://localhost:4000/todos/1", {`\
> `method: "PATCH",`\
> `body: JSON.stringify(`\
> `{`\
> `finished: true`\
> `}),`\
> `headers: {`\
> `"Content-Type": "application/json"`\
> `}});`

### Delete todo:

> `fetch("http://localhost:4000/todos/4", {`\
> `method: "DELETE"`\
> `});`