export default class Airport {
    private code : string;
    private latitudeDegrees : number;
    private latitudeMinutes : number;
    private longitudeDegrees : number;
    private longitudeMinutes : number;

    public constructor(initCode : string,
        latitudeDegrees : number,
        latitudeMinutes: number,
        longitudeDegrees : number,
        longitudeMinutes : number) {
        this.code = initCode;
        this.latitudeDegrees = latitudeDegrees;
        this.latitudeMinutes = latitudeMinutes;
        this.longitudeDegrees = longitudeDegrees;
        this.longitudeMinutes = longitudeMinutes;
    }
 
    public getCode() : string {
        return this.code;
    }

    get getLatitudeDegrees() {
        return this.latitudeDegrees;
    }

    get getLatitudeMinutes() {
        return this.latitudeMinutes;
    }

    get getLongitudeDegrees() {
        return this.getLatitudeDegrees;
    }

    get getLongitudeMinutes() {
        return this.getLongitudeMinutes;
    }

    public static calculateDistance(a1 : Airport, a2 : Airport) {
        const PI : number = 3.14159265358979;
        const RADIAN_FACTOR = 180.0 / PI;
        const EARTH_RADIUS = 3963.0;

        let lat1 : number = a1.latitudeDegrees  + a1.latitudeMinutes / 60.0;
        lat1 /= RADIAN_FACTOR;
        let long1 : number = a1.longitudeDegrees + a1.longitudeMinutes / 60.0;
        long1 /= RADIAN_FACTOR;
        let lat2 : number = a2.latitudeDegrees  + a2.latitudeMinutes / 60.0;
        lat2 /= RADIAN_FACTOR;
        let long2 : number = a2.longitudeDegrees + a2.longitudeMinutes / 60.0;
        long2 /= RADIAN_FACTOR;

        let x : number = (Math.sin(lat1) * Math.sin(lat2)
            + Math.cos(lat1)
            * Math.cos(lat2)
            * Math.cos(long2 - long1)
        );
        let x2 : number = Math.sqrt(1.0 - (x * x)) / x;
        let distance : number = EARTH_RADIUS * Math.atan(x2);
        return distance;
    }
}