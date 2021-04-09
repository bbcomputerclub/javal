var md = require('markdown-it')({
    html: true,
    linkify: true}
);

const fs = require("fs");

const TEMPLATE = fs.readFileSync("template.html", "utf8");

let files = fs.readdirSync("md/");
for (let file of files) {
    let unit = file;
    if (file.lastIndexOf(".") != -1) {
        unit = file.slice(0, file.lastIndexOf("."));
    }


    let data = fs.readFileSync("md/" + file, {encoding:"utf8"});
    let title = data.split("\n")[0].replace(/^\#+/g, "");
    let content = data.split("\n").slice(1).join("\n");

    let html = TEMPLATE.replace("%%CONTENT%%", md.render(content));
    html = html.replace("%%TITLE%%", title);
    html = html.replace("%%DAY%%", unit);
    fs.writeFileSync("html/" + unit + ".html", html);
}
