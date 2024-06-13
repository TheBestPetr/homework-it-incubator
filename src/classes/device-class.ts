export class DeviceClass {
    constructor(
        public userId: string,
        public deviceId: string,
        public iat: string,
        public deviceName: string,
        public ip: string,
        public exp: string
    ) {
    }
}