import { load } from 'js-yaml';
import * as fs from 'fs';
import { get } from 'ts-dot-prop';

interface Builder {
    andPath(data: string): TheConfig;
}

export class TheConfig {
    private fileLoaded: any;

    public constructor(private filePath: string, private data: string) {
        this.filePath = filePath;
        this.data = data;
    }

    public static fromFile(filePath: string): Builder {
        return {
            andPath: (data: string): TheConfig => new TheConfig(filePath, data)
        };
    }

    // TODO: Implement JSON support
    public retrieveData(): string | number {
        this.fileLoaded = load(fs.readFileSync(this.filePath, 'utf-8'));
        return get(this.fileLoaded, this.data)
    }
}