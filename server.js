let todos = require("./todo.json");
const http = require("http");
const crypto = require("crypto");
const port = 4000;

const app = http.createServer((req, res) => {
  const tasks = req.url.split("/");
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PATCH, DELETE, OPTIONS, POST, PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    console.log("options bby");
    res.end();
  }

  // GET
  //   Hämtar upp hela todo-listan. Kommer till denna genom /todos.
  if (tasks[1] === "todos" && req.method === "GET" && tasks.length === 2) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    // console.log("hämtas denna?");
    // console.log(todos);
    res.end(JSON.stringify(todos));
  }
  // GET
  // Hämtar upp enskild todo.
  else if (tasks[1] === "todos" && req.method === "GET" && tasks.length === 3) {
    const wantedId = parseInt(tasks[2]);
    const foundId = todos.todos.find(({ id }) => id === wantedId);

    // Om todon finns svarar den med statuskod 200, annars 404.
    if (foundId) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(foundId));
    } else {
      res.statusCode = 404;
      res.end();
    }
  }
  // POST
  // fetch("http://localhost:4000/todos", { method: "POST", body: JSON.stringify({task: "vattna blommor" }), headers: {"Content-Type": "application/json"}})
  else if (req.method === "POST" && tasks[1] === "todos") {
    console.log("Nu lyckades du skicka en post-req");
    res.statusCode = 200;
    req.on("data", (chunk) => {
      const data = JSON.parse(chunk);
      console.log(data);
      // byta ut mot crypto?
      // crypto.randomBytes(12).toString(”hex”)
      todos.todos.push({
        id: +(
          new Date().getTime().toString() + Math.floor(Math.random() * 100000)
        ),
        ...data,
      });
      res.end();
    });
  }
  // DELETE
  // fetch("http://localhost:4000/todos/4", { method: "DELETE" })
  else if (req.method === "DELETE" && tasks[1] === "todos") {
    let wantedId = parseInt(tasks[2]);
    todos.todos = todos.todos.filter((todo) => todo.id !== wantedId);

    res.statusCode = 204;
    res.end();
  }

  // PUT
  // fetch("http://localhost:4000/todos/1", { method: "PUT", body: JSON.stringify({id: 144, task: "borsta kattrumpor" }), headers: {"Content-Type": "application/json"}})
  else if (req.method === "PUT" && tasks[1] === "todos") {
    let wantedId = parseInt(tasks[2]);
    const foundId = todos.todos.findIndex(({ id }) => id === wantedId);

    req.on("data", (chunk) => {
      todos.todos[foundId] = JSON.parse(chunk);
      console.log(JSON.parse(chunk));
    });

    res.statusCode = 200;
    res.end();
  }

  // PATCH
  // fetch("http://localhost:4000/todos/1", { method: "PATCH", body: JSON.stringify({task: "laga mat" }), headers: {"Content-Type": "application/json"}})
  else if (req.method === "PATCH" && tasks[1] === "todos") {
    let wantedId = parseInt(tasks[2]);
    const foundId = todos.todos.findIndex(({ id }) => id === wantedId);

    req.on("data", (chunk) => {
      const data = JSON.parse(chunk);
      let taskIndex = todos.todos[foundId];
      // let taskDone = todos.todos[]

      console.log(data);
      if (data.task) {
        taskIndex.task = data.task;
      } else if (data.finished) {
        taskIndex.finished = data.finished;
      } else {
        res.statusCode = 400;
      }
    });
  }
  console.log("patchen är igång");

  res.end();
});

app.listen(port, () => {
  console.log(`Servern är igång i port ${port}`);
});
