import fs from 'fs';
import newman from 'newman';
import del from 'del';
import changeCase from 'change-case';

function IsJsonString (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const dir = 'server/static/integration';

del([dir]).then(() => {
    newman.run({
        collection: require('./test-collection.json')
    }, (err) => {
        if (err) { throw err; }
        console.log('collection run complete!');
    }).on('request', (err, args) => {
        if (err) { throw err; }

        const response = args.response;
        const name = args.item.name;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        if (IsJsonString(response.body)) {
            fs.writeFile(`${dir}/${changeCase.snakeCase(name)}.json`, response.body, (err) => {
                if (err) {
                    console.log(err);
                }

                console.log(`saved collection: ${changeCase.snakeCase(name)}.json`);
            });
        } else {
            fs.writeFile(`${dir}/${changeCase.snakeCase(name)}`, response.body, (err) => {
                if (err) {
                    console.log(err);
                }

                console.log(`saved collection: ${changeCase.snakeCase(name)}`);
            });
        }
    });
});
