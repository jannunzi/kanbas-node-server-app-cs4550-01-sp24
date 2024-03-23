export default function Hello(app) {
  function sayHello(asd, res) {
    res.send("Hello, World!");
  }

  function sendTodos(qwe, wer) {
    wer.send([
      { id: 1, text: "Buy groceries", done: false },
      { id: 2, text: "Do laundry", done: true },
    ]);
  }

  function add(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.send(`Sum of ${a} and ${b} is ${a + b}`);
  }

  function calculator(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const op = req.query.op;
    let result;
    switch (op) {
      case "add":
        result = a + b;
        break;
      case "sub":
        result = a - b;
        break;
      case "mul":
        result = a * b;
        break;
      case "div":
        result = a / b;
        break;
      default:
        result = "Invalid operation";
    }
    res.send(`Result: ${result}`);
  }

  app.get("/hello", sayHello);
  app.get("/todos", sendTodos);
  app.get("/add", add);
  app.get("/calc", calculator);
}
