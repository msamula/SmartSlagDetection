export class User{
    constructor(ip, username, password, clientID, clientSecret) {
        this.ip = ip;
        this.username = username;
        this.password = password;
        this.clientID = clientID;
        this.clientSecret = clientSecret;
    }
}

export class Token {
    constructor(accessToken, type, expireSec, scope, refreshToken, iat, exp) {
        this.accessToken = accessToken;
        this.type = type;
        this.expireSec = expireSec;
        this.scope = scope;
        this.refreshToken = refreshToken;
        this.iat = iat;
        this.exp = exp;
    }
}

export class TiffData {
    constructor(B,R,F,RBFOffset,emissivity) {
        this.B = B;
        this.R = R;
        this.F = F;
        this.RBFOffset  = RBFOffset;
        this.emissivity = emissivity;
    }
}