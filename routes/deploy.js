const express = require("express");
const router = express.Router();

const textMiddleware = require("plaintextparser");

function readlineSync() {
    return new Promise((resolve, reject) => {
        process.stdin.resume();
        process.stdin.on('data', function (data) {
            process.stdin.pause();
            resolve(data);
        });
    });
}

router.post("/", textMiddleware, async (req, res) => {
    console.log("repl.deploy" + req.text + req.get("Signature"));

    let line = await readlineSync();
    console.log(line);

    let ret = JSON.parse(line);

    await res.status(ret.status).send(ret.body);
    console.log("repl.deploy-success");
});

module.exports = router;