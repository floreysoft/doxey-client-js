declare module 'doxey-client-js' {
    export function doConvertInput(url: string, files: any[], format: string, model: any, locale: string, timezone: string, currency: string, apiKey: string);
    export function doConvertUrl(url: string, template: string, format: string, model: any, locale: string, timezone: string, currency: string, apiKey: string);
}