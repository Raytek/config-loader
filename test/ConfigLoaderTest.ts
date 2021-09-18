import { join } from 'path';
import { TheConfig } from '../src';

describe("retrive config", () => {

    const file = join(__dirname, '../resource/sample.yml');

    it("should retrieve a string from the yaml file", () => {

        expect(TheConfig
            .fromFile(file)
            .andPath('status.success.200')
            .retrieveData()
        ).toBe('OK');

    });

    it("should retrieve a number from the yaml file", () => {

        expect(TheConfig
            .fromFile(file)
            .andPath('application.client.port')
            .retrieveData()
        ).toBe(8084);

    });

});
