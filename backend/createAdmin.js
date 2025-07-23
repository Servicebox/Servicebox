const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');

const createAdmin = async () => {
  const email = 'admin@example.com';
  const password = 'securePassword123';
  
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    console.log('Admin already exists');
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = new Admin({
    email,
    password: hashedPassword
  });

  await admin.save();
  console.log('Admin created successfully:', email);
};

createAdmin().catch(console.error);