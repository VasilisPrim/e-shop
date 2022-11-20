const bcrypt = require("bcryptjs");
const mongodb = require("mongodb");

const db = require("../data/database");

const ObjectId = mongodb.ObjectId;

class User {
  constructor(email, password,name,street,postal,city) {
    this.email = email;
    this.password = password;
    
    this.name = name;
    this.address = {
      street: street,
      postalCode: postal,
      city: city,
    };

    
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    const result = await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      
      name: this.name,
      address: this.address,
    });

    return result;
  }
  async getExistingUser(){
    const result = db
      .getDb()
      .collection("users")
      .findOne({ email: this.email });

      return result;
  }
  async userExistsAlready() {
    const existingUser = await this.getExistingUser();

    if(existingUser) return true;
    
    return false;
  }

  async login(comparePassword) {
    const passwordsAreEqual = await bcrypt.compare(
      this.password,
      comparePassword
    );
    return passwordsAreEqual;
  }
}

module.exports = User;
