#!/usr/bin/env node
const process = require('process');
const fs = require('fs');
const sourceMapURL = require('source-map-url');

const argv = require('yargs').argv;
const operation = argv._[0]
const input = fs.readFileSync(process.stdin.fd, 'utf-8');

switch (operation) {
    case 'set':
        process.stdout.write(updateSourceURL(input, argv.u));
        break;
    case 'remove':
        process.stdout.write(removeSourceURL(input));
        break;
    default:
        break;
}

function updateSourceURL(code, url) {
    return `${sourceMapURL.removeFrom(code)}\n//# sourceMappingURL=${url}`;
}

function removeSourceURL(code) {
    return sourceMapURL.removeFrom(code);
}
