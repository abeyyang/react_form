import newman from 'newman';

newman.run({
    collection: require('./test-collection.json'),
    reporters: 'cli'
}, (err) => {
    if (err) { throw err; }
    console.log('collection run complete!');
});
