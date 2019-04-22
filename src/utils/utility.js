export const API_KEY = 'AIzaSyClQjnfXbiBsVlSRY9D1J5yjKRFor4yvaY';

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}