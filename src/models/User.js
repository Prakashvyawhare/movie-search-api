// Mock user model - Replace with database model when integrating DB
class User {
  constructor(id, name, role) {
    this.id = id;
    this.name = name;
    this.role = role;
  }

  static findById(id) {
    // Mock user data - Replace with database query
    const users = [
      new User('123', 'Prakash', 'dev'),
      new User('456', 'John', 'admin'),
    ];
    return users.find(user => user.id === id);
  }

  static findByName(name) {
    const users = [
      new User('123', 'Prakash', 'dev'),
      new User('456', 'John', 'admin'),
    ];
    return users.find(user => user.name === name);
  }

  static getAll() {
    return [
      new User('123', 'Prakash', 'dev'),
      new User('456', 'John', 'admin'),
    ];
  }
}

module.exports = User;
