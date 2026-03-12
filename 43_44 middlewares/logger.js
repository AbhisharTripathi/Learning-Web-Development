const express = require("express");
const useragent = require("useragent");
const cookieParser = require("cookie-parser");

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.set("trust proxy", true);

app.use((req, res, next) => {
    const agent = useragent.parse(req.headers["user-agent"]);
    const requestInfo = {
        //Basic request info
        method: req.method,
        url: req.originalUrl,
        protocol: req.protocol,
        httpVersion: req.httpVersion,
        secure: req.secure,

        //IP info
        ip: req.ip,
        ips: req.ips,
        forwardedFor: req.headers["x-forwarded-for"] || null,

        //Headers
        headers: req.headers,

        //Browser / device info
        userAgent: req.headers["user-agent"],
        browser: {
            name: agent.family,
            version: agent.toVersion(),
        },
        device: {
            family: agent.device.family,
            major: agent.device.major,
            minor: agent.device.minor,
        },

        //Request Data
        query: req.query,
        body: req.body,
        params: req.params,
        cookies: req.cookies,

        //Time
        timestamp: new Date()
    };
    console.log("Incoming request Data :");
    console.log(JSON.stringify(requestInfo, null, 2));
    res.json({
        message: "Request Data captured successfully",
        data: requestInfo
    });
});

app.get("/", (req, res) => {
    res.send("success");
});

app.listen(8080, () => {
    console.log("Server is running in port 8080");
});