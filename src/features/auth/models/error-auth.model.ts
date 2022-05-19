export interface IErrorAuth {
    codePrefix: string;
    message: string;
    errorInfo: {
        code: string;
        message: string;
    }
}