const jsonfile = require("jsonfile");


class DB {

    dbFilePath = 'src/daos/MockDb/MockDb.json';


    openDb() {
        return jsonfile.readFile(this.dbFilePath);
    }


    saveDb(db) {
        return jsonfile.writeFile(this.dbFilePath, db);
    }
}

module.exports = DB
