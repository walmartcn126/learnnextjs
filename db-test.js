const { Client } = require('pg');

// 创建数据库连接
const client = new Client({
  user: 'mall_user', // 替换为您的用户名
  host: 'localhost',
  database: 'mall', // 替换为您的数据库名
  password: 'mall_user', // 替换为您的密码
  port: 5432, // PostgreSQL 默认端口
});

async function testConnection() {
  try {
    await client.connect(); // 连接到数据库
    const res = await client.query('SELECT NOW()'); // 执行查询
    console.log('Database connected successfully:', res.rows);
  } catch (error) {
    console.error('Database connection error:', error);
  } finally {
    await client.end(); // 关闭连接
  }
}

testConnection();