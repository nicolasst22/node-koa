const util = require('util')
const Mensajes = require("../messages/index")
const { schema, normalize, denormalize } = require("normalizr");
const Author = new schema.Entity("authors")
const Message = new schema.Entity("message")
const logger = require("../config/logger")
// const Messages = new schema.Entity("messages", {messages: [Message]});
const Messages = [Message];

// (async()=>{
//     const msgs1 = await mensaes.getAll();
//     const msgs  ={ id: 1, messages: msgs1 }
//     const n1 = normalize(msgs1, Messages);
//     const n = denormalize(n1.result, Messages, n1.entities)
// });

const NOT_FOUND = { error: 'mensaje no encontrado' };
exports.getMessages = async (ctx) => {
    const msgs1 = await Mensajes.getAll();
    //const msgs  ={ id: 1, messages: msgs1 }
    const n = normalize(msgs1, Messages);
    ctx.body = n;
}

exports.getMessageById = async (ctx, next) => {
    const { id } = ctx.request.params
    try {
        const msg = await Mensajes.getById(id);
        if (msg) {
            ctx.body =msg;
        } else {
            ctx.status = 404;
            ctx.body = NOT_FOUND
        }
    } catch (err) {
        if (err.name === "BSONTypeError") {
            ctx.status = 404;
            ctx.body = NOT_FOUND
        }
        logger.error("error", ex)
        ctx.status = 500;
        ctx.body = ("Se produjo un error. Revise los logs de error");
    }
}

exports.saveMessage = async (req, res) => {
    const body = req.body;
    const { email } = req.session
    const msg = {
        text: body.message,
        fecha: new Date(),
        author: {
            id: email,
        }
    }
    await Mensajes.save(msg);
    res.redirect('/');
}


