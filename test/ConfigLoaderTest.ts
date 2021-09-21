import { join } from 'path';
import { TheConfig } from '../src';

describe('retrieve config from a yaml', () => {

    const yamlFile = join(__dirname, '../resource/sample.yml');

    it('should retrieve a string from the yaml file', () => {

        expect(TheConfig
            .fromFile(yamlFile)
            .andPath('status.success.200')
            .retrieveData()
        ).toBe('OK');

    });

    it('should retrieve a number from the yaml file', () => {

        expect(TheConfig
            .fromFile(yamlFile)
            .andPath('application.client.port')
            .retrieveData()
        ).toBe(8084);

    });

    it('should retrieve a boolean from the yaml file', () => {

        expect(TheConfig
            .fromFile(yamlFile)
            .andPath('application.server.online')
            .retrieveData()
        ).toBe(true);

    });

    it('should retrieve a list from the yaml file', () => {

        expect(TheConfig
            .fromFile(yamlFile)
            .andPath('list')
            .retrieveData()
        ).toStrictEqual([ 'a', 'b', 'c' ]);

    });

    it('should retrieve an item from a list in the yaml file', () => {

        expect(TheConfig
            .fromFile(yamlFile)
            .andPath('list[0]')
            .retrieveData()
        ).toBe('a');

    });

    it('should retrieve a dict from the yaml file', () => {

        expect(TheConfig
            .fromFile(yamlFile)
            .andPath('dict')
            .retrieveData()
        ).toStrictEqual({ 'foo': 'bar' });

    });

    it('should retrieve a value from a dict key in the yaml file', () => {

        expect(TheConfig
            .fromFile(yamlFile)
            .andPath('dict.foo')
            .retrieveData()
        ).toBe('bar');

    });

    it('should retrieve a object from the yaml file', () => {

        expect(TheConfig
            .fromFile(yamlFile)
            .andPath('application')
            .retrieveData()
        ).toStrictEqual({
            'client': {
                'port': 8084,
                'online': false
            },
            'server': {
                'port': 7373,
                'online': true
            }
        });

    });

    it('should retrieve an undefined value as a string', () => {

        expect(TheConfig
            .fromFile(yamlFile)
            .andPath('undefined_value')
            .retrieveData()
        ).toBe('undefined');

    });

    it('should throw an exception when the yaml file is not found', () => {

        expect(() => {
            TheConfig
            .fromFile('not_found.yml')
            .andPath('')
            .retrieveData()
        }).toThrow('no such file or directory');

    });

    it('should throw an exception when the path is not found in a yaml file', () => {

        expect(() => {
            TheConfig
            .fromFile(yamlFile)
            .andPath('not.found')
            .retrieveData()
        }).toThrow('Path not found!');

    });

});

describe('retrieve config from a json', () => {

    const jsonFile = join(__dirname, '../resource/sample.json');

    it('should retrieve a string from the json file', () => {

        expect(TheConfig
            .fromFile(jsonFile)
            .andPath('status.client_errors.404')
            .retrieveData()
        ).toBe('Not Found');

    });

    it('should retrieve a number from the json file', () => {

        expect(TheConfig
            .fromFile(jsonFile)
            .andPath('application.client.port')
            .retrieveData()
        ).toBe(8084);

    });

    it('should retrieve a boolean from the json file', () => {

        expect(TheConfig
            .fromFile(jsonFile)
            .andPath('application.client.online')
            .retrieveData()
        ).toBe(false);

    });

    it('should retrieve a list from the json file', () => {

        expect(TheConfig
            .fromFile(jsonFile)
            .andPath('list')
            .retrieveData()
        ).toStrictEqual([ 'a', 'b', 'c' ]);

    });

    it('should retrieve an item from a list in the json file', () => {

        expect(TheConfig
            .fromFile(jsonFile)
            .andPath('list[0]')
            .retrieveData()
        ).toBe('a');

    });

    it('should retrieve a dict from the json file', () => {

        expect(TheConfig
            .fromFile(jsonFile)
            .andPath('dict')
            .retrieveData()
        ).toStrictEqual({ 'foo': 'bar' });

    });

    it('should retrieve a value from a dict key in the json file', () => {

        expect(TheConfig
            .fromFile(jsonFile)
            .andPath('dict.foo')
            .retrieveData()
        ).toBe('bar');

    });

    it('should retrieve a object from the json file', () => {

        expect(TheConfig
            .fromFile(jsonFile)
            .andPath('application')
            .retrieveData()
        ).toStrictEqual({
            'client': {
                'port': 8084,
                'online': false
            },
            'server': {
                'port': 7373,
                'online': true
            }
        });

    });

    it('should retrieve a null value without throwing an exception', () => {

        expect(TheConfig
            .fromFile(jsonFile)
            .andPath('null_field')
            .retrieveData()
        ).toBe(null);

    });

    it('should throw an exception when the json file is not found', () => {

        expect(() => {
            TheConfig
            .fromFile('not_found.json')
            .andPath('')
            .retrieveData()
        }).toThrow('no such file or directory');

    });

    it('should throw an exception when the path is not found in a json file', () => {

        expect(() => {
            TheConfig
            .fromFile(jsonFile)
            .andPath('not.found')
            .retrieveData()
        }).toThrow('Path not found!');

    });

});
