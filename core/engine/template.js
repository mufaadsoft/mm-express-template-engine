const fs = require("fs");

/***********************
 * MM TEMPLATE ENGINE  *
 *   DEVELOPED BY MM   *
 *     2022-12-30      *
 * V0.9 (BETA VERSION) *
 ***********************/

const TemplateEngine = (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);
    const skip = ["settings", "_locals", "cache"];
    let rendered = content.toString();
    for (param in options) {
      if (skip.includes(param)) {
        continue;
      }
      const r = "::" + param + "::";
      const reg = new RegExp(r, "gm");
      rendered = rendered.replace(reg, options[param]);
    }
    return callback(null, rendered);
  });
};

module.exports = TemplateEngine;
