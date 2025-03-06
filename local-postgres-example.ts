const { Client } = require('pg');

// 数据库配置
const dbConfig = {
  user: 'mall_user',
  host: 'localhost',
  database: 'mall',
  password: 'mall_user',
  port: 5432,
};

// 创建数据库客户端
function createClient() {
  return new Client(dbConfig);
}

// 示例函数：获取所有客户
export async function fetchCustomers(client) {
  try {
    const res = await client.query('SELECT id, name, email FROM customers ORDER BY name ASC');
    return res.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customers.');
  }
}

// 示例函数：获取所有发票
export async function fetchInvoices(client) {
  try {
    const res = await client.query('SELECT id, amount, status FROM invoices ORDER BY date DESC');
    return res.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

// 测试函数
export async function runTests() {
  const client = createClient();
  try {
    await client.connect();
    
    // 测试获取客户
    const customers = await fetchCustomers(client);
    console.log('测试获取客户:', customers);
    
    // 测试获取发票
    const invoices = await fetchInvoices(client);
    console.log('测试获取发票:', invoices);
    
  } catch (error) {
    console.error('测试失败:', error);
  } finally {
    await client.end();
  }
}

// 运行测试
if (require.main === module) {
  runTests();
}