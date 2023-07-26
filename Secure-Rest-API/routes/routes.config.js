const jwt = require("jsonwebtoken");
const ntplib = require("ntplib");

class KaalkaNTP {
  constructor() {
    this.second = 0;
    this._updateTimestamp();
  }

  _updateTimestamp() {
    ntplib.getNetworkTime("pool.ntp.org", 123)
      .then((time) => {
        const timestamp = time.tx.raw();
        this.second = Math.floor(timestamp % 60);
        console.log("NTP time updated:", this.second);
      })
      .catch((err) => {
        console.error("Error fetching NTP time:", err);
      });
  }

  encrypt(data) {
    const encryptedMessage = this._encryptMessage(data);
    return encryptedMessage;
  }

  decrypt(encryptedMessage) {
    const decryptedMessage = this._decryptMessage(encryptedMessage);
    return decryptedMessage;
  }

  _encryptMessage(data) {
    const asciiValues = [...data].map((char) => char.charCodeAt(0));
    const encryptedValues = asciiValues.map((val) => this._applyTrigonometricFunction(val));
    const encryptedMessage = encryptedValues.map((val) => String.fromCharCode(val)).join("");
    return encryptedMessage;
  }

  _decryptMessage(encryptedMessage) {
    const asciiValues = [...encryptedMessage].map((char) => char.charCodeAt(0));
    const decryptedValues = asciiValues.map((val) => this._applyInverseFunction(val));
    const decryptedMessage = decryptedValues.map((val) => String.fromCharCode(val)).join("");
    return decryptedMessage;
  }

  _applyTrigonometricFunction(value) {
    const quadrant = this._determineQuadrant(this.second);
    switch (quadrant) {
      case 1:
        return value + this.second; // Caesar cipher shift by this.second
      case 2:
        return value + (1 / Math.tan(this.second));
      case 3:
        return value + Math.cos(this.second);
      case 4:
        return value + Math.tan(this.second);
      default:
        return value;
    }
  }

  _applyInverseFunction(value) {
    const quadrant = this._determineQuadrant(this.second);
    switch (quadrant) {
      case 1:
        return value - this.second; // Caesar cipher shift by this.second
      case 2:
        return value - (1 / Math.tan(this.second));
      case 3:
        return value - Math.cos(this.second);
      case 4:
        return value - Math.tan(this.second);
      default:
        return value;
    }
  }

  _determineQuadrant(second) {
    if (0 <= second && second <= 15) {
      return 1;
    } else if (16 <= second && second <= 30) {
      return 2;
    } else if (31 <= second && second <= 45) {
      return 3;
    } else {
      return 4;
    }
  }
}

module.exports = KaalkaNTP;
