import db from "../Database/index.js";

export default function Modules(app) {
  // CRUD
  // Read all modules
  app.get("/api/modules", (req, res) => {
    res.send(db.modules);
  });
  // Read one module by id
  app.get("/api/modules/:id", (req, res) => {
    const id = req.params.id;
    const module = db.modules.find((m) => m._id === id);
    if (!module) {
      return res.status(404).send("Module not found");
    }
    res.send(module);
  });
  app.get("/api/courses/:courseId/modules", (req, res) => {
    const courseId = req.params.courseId;
    const modules = db.modules.filter((m) => m.course === courseId);
    res.send(modules);
  });
  // Create a new module
  // Update a module
  // Delete a module
}
