const messageController = require("../../controllers/MessageController");
const Router = require("koa-router")
const api = new Router();
api.get("/", messageController.getMessages);
api.get("/:id", messageController.getMessageById);
api.post("/", messageController.saveMessage);
module.exports = api;