// Mock user model - Replace with database model when integrating DB
const mockUsers = [
  { id: '123', email: 'prakash@gmail.com', name: 'Prakash', role: 'dev' },
  { id: '456', email: 'demo@example.com', name: 'John', role: 'admin' },
];
class User {
  
  constructor(id,email, name, role) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.role = role;

  }

  static findById(id) {
    // Mock user data - Replace with database query
    return users.find(user => user.id === id);
  }

  static findByEmail(email) {
     const user = mockUsers.find(user => user.email === email);
    return user 
  }

  static getAll() {
    return [
      new User('123', 'Prakash', 'dev'),
      new User('456', 'John', 'admin'),
    ];
  }
}

module.exports = User;
