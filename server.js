let todos = require("./todo.json");
const http = require("http");
const port = 4000;

const app = http.createServer((req, res) => {
  const tasks = req.url.split("/");
  res.setHeader("Access-Control-Allow-Origin", "*");
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
    res.end();
  }

  // GET
  //   Hämtar upp hela todo-listan. Kommer till denna genom /todos.
  if (tasks[1] === "todos" && req.method === "GET" && tasks.length === 2) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(todos));
  }

  // GET
  // Hämtar upp enskild todo.
  else if (tasks[1] === "todos" && req.method === "GET" && tasks.length === 3) {
    const wantedId = parseInt(tasks[2]);
    const foundId = todos.todos.find(({ id }) => id === wantedId);

    if (foundId) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      console.log("Yay, you found a task!");
      res.end(JSON.stringify(foundId));
    } else {
      res.statusCode = 404;
      console.error("ID does not exist bruh");
      res.end();
    }
  }
  // POST
  else if (req.method === "POST" && tasks[1] === "todos") {
    res.statusCode = 200;
    req.on("data", (chunk) => {
      const data = JSON.parse(chunk);
      todos.todos.push({
        id: +(
          new Date().getTime().toString() + Math.floor(Math.random() * 100000)
        ),
        ...data,
        finished: false,
      });
      console.log("Gr8 success, new todo 4 u");
      res.end();
    });
  }

  // DELETE
  else if (req.method === "DELETE" && tasks[1] === "todos") {
    let wantedId = parseInt(tasks[2]);
    todos.todos = todos.todos.filter((todo) => todo.id !== wantedId);

    res.statusCode = 204;
    console.log("Y u deleted todo? What did it do to you?");
    res.end();
  }

  // PUT
  else if (req.method === "PUT" && tasks[1] === "todos") {
    let wantedId = parseInt(tasks[2]);
    const foundId = todos.todos.findIndex(({ id }) => id === wantedId);

    req.on("data", (chunk) => {
      todos.todos[foundId] = JSON.parse(chunk);
    });

    res.statusCode = 200;
    console.log("Wow, u changed with ze PUT");
    res.end();
  }

  // PATCH
  else if (req.method === "PATCH" && tasks[1] === "todos") {
    let wantedId = parseInt(tasks[2]);
    const foundId = todos.todos.findIndex(({ id }) => id === wantedId);

    req.on("data", (chunk) => {
      const data = JSON.parse(chunk);
      let taskIndex = todos.todos[foundId];

      if (data.task) {
        taskIndex.task = data.task;
      } else if (data.finished) {
        taskIndex.finished = data.finished;
        console.log("U changed the status of the finished task bby");
      } else if (!data.finished) {
        taskIndex.finished = data.finished;
        console.log("U changed the status of the finished task bby");
      } else {
        res.statusCode = 400;
        console.error("U did something wrong beetch");
      }
    });
  }
  console.log("Dis is todo-list.");
  res.end();
});

app.listen(port, () => {
  console.log(`Servern är igång i port ${port}`);
});
