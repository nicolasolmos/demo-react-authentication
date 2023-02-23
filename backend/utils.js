const { createHash } = require('node:crypto');
const fs = require('fs/promises');

const HASHES_FILE = process.env.NODE_ENV === 'test' ? './hashes' : './mocks/hashes.mock';

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        const hash = createHash('sha512');

        hash.on('readable', () => {

            const hashString = hash.read();

            if(hashString) {
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
    return await fs.appendFile('./hashes', `\n${user} ${hash}`, {
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
    
        if(userHashNamePair) {
    
            const userHash = userHashNamePair.split(' ');
            return userHash[1];
        }
    
        return null;

    } catch(error) {
        console.error(error);
        return error;
    }
    
}

module.exports = {
    hashLookupByUsername,
    storeHash,
    hashPassword
};


