import { load } from 'js-yaml';
import * as fs from 'fs';
import { get } from 'ts-dot-prop';

interface Builder {
    andPath(data: string): TheConfig;
}

export class TheConfig {
    public constructor(private filePath: string, private data: string) {
        this.filePath = filePath;
        this.data = data;
    }

    public static fromFile(filePath: string): Builder {
        return {
            andPath: (data: string): TheConfig => new TheConfig(filePath, data)
        };
    }

    public retrieveData(): any {
        const fileLoaded: any = load(fs.readFileSync(this.filePath, 'utf-8'));
        const value = get(fileLoaded, this.data);
        if (value === undefined) {
            throw new Error('Path not found!');
        } else {
            return value;
        }
    }
}