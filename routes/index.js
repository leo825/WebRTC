/**
 * Created by wchi on 2015/11/23.
 */
exports.index = function(req, res) {
    var indexFullPath = process.cwd() + '/views/index.html';
    res.sendfile(indexFullPath);
};