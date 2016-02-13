var fs = require('fs-extra');

exports.writeFile = function writeFile(file, data) {
    return new Promise(function (resolve, reject) {
        fs.ensureFile(file, function (err) {
            if (err) {
                reject(err);
            } else {
                fs.writeFile(file, data, 'utf8', function (err) {
                    if (err) reject(err);
                    else resolve();
                });
            }
        });
    });
};
