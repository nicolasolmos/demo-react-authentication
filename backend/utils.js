const { createHash } = require('node:crypto');
const fs = require('fs/promises');
const jose = require('jose');

const HASHES_FILE = process.env.NODE_ENV === 'PROD' ? './hashes' : './mocks/hashes.mock';

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        const hash = createHash('sha512');

        hash.on('readable', () => {

            const hashString = hash.read();

            if (hashString) {
                resolve(hashString.toString('hex'));
            }

            reject('Error while hashing the password');
        });
        hash.write(password);
        hash.end();
        reject('Error while hashing the password');
    });
}

async function storeHash(hash, user) {
    return await fs.appendFile('./hashes', `${user} ${hash}\n`, {
        encoding: 'utf-8'
    });
}

async function hashLookupByUsername(username) {
    try {
        const hashes = await fs.readFile(HASHES_FILE, {
            encoding: 'utf-8'
        });

        const hashesArray = hashes.split('\n');

        const userHashNamePair = hashesArray.find(item => item.includes((username)));

        if (userHashNamePair) {
            const userHash = userHashNamePair.split(' ');
            return userHash[1];
        }

        return null;

    } catch (error) {
        console.error(error);
        return error;
    }
}


async function createLoginToken(username) {
    if(!username) {
        throw Error('Must provide a username');
    }

    try {
        const key = new TextEncoder().encode(process.env.LOGIN_TOKEN_SECRET);

        const token = await new jose.SignJWT({ username, login: true })
            .setProtectedHeader({ alg: 'HS256' })
            .sign(key)

        return token;
    } catch (error) {
        console.error(error);
        return error;
    }
}

async function verifyToken(token) {
    try {
        console.log('token', token)
        const key = new TextEncoder().encode(process.env.LOGIN_TOKEN_SECRET);
        await jose.jwtVerify(token, key);
        return true;
    } catch(error) {
        return false;
    }
}

module.exports = {
    hashLookupByUsername,
    storeHash,
    hashPassword,
    createLoginToken,
    verifyToken
};


