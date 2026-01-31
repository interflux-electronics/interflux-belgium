export default class Country {
    constructor(data: any) {
        const { id, attributes } = data;

        this.id = id;
        this.nameEnglish = attributes['name-english'];
        this.nameNative = attributes['name-native'];
    }

    id; // two letter country code
    nameEnglish;
    nameNative;
}
