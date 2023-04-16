export const parseJSON = <T>(jsonString: string): T => {
    return JSON.parse(jsonString)
}

export const stringifyJSON = <T>(data: T): string => {
    return JSON.stringify(data)
}
