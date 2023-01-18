interface IDataItem {
    name: string,
    label: string,
    urlPath: string
}

export const data: IDataItem[] = [
    {
        name: 'matrix',
        label: 'Matrix',
        urlPath: 'Matrix'
    },
    {
        name: 'matrix-reloaded',
        label: 'Reloaded',
        urlPath: 'Matrix%20Reloaded'
    },
    {
        name: 'matrix-revolution',
        label: 'Revolution',
        urlPath: 'Matrix%20Revolutions' 
    }
] 