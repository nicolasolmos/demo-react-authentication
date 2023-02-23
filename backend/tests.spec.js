const { hashLookupByUsername, hashPassword } = require('./utils');

describe('hash utility functions', () => {
        it('finds a hash by username', (done) => {

                const username = 'nicolas';
                const result = hashLookupByUsername(username);

                result.then((res) => {
                        expect(res).toEqual('AA11BB22CC33');
                        done();
                }).catch(error => done(error))
        })

        it('returns a null when a hash is not found', (done) => {
                const username = 'pedro';
                const result = hashLookupByUsername(username);

                result.then((res) => {
                        expect(res).toEqual(null);
                        done();
                }).catch(error => done(error));
        })

        it('should hash a password', () => {
                const expectedResult = '1a01786bfb02de2f6d2f88be03d64d225ac8850a0eabc4a28e2007b932d93f9128013eda6b7536fc41be26ec61ba6d4dc725b618ed8511fd5e6f622ffa447875';

                hashPassword('nicolas-password')
                .then((result) => expect(result).toBe(expectedResult));
        })

})
