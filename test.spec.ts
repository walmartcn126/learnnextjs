import { fetchCustomers, fetchInvoices } from './local-postgres-example'; // 确保导出函数
import { Client } from 'pg';

let client;

beforeAll(async () => {
  client = new Client({
    user: 'mall_user',
    host: 'localhost',
    database: 'mall',
    password: 'mall_user',
    port: 5432,
  });
  await client.connect();
});

afterAll(async () => {
  await client.end(); // 关闭数据库连接
});

test('fetchCustomers should return an array of customers', async () => {
  const customers = await fetchCustomers(client);
  expect(Array.isArray(customers)).toBe(true);
  expect(customers.length).toBeGreaterThan(0); // 假设数据库中有客户
});

test('fetchInvoices should return an array of invoices', async () => {
  const invoices = await fetchInvoices(client);
  expect(Array.isArray(invoices)).toBe(true);
  expect(invoices.length).toBeGreaterThan(0); // 假设数据库中有发票
  console.log('Invoices:', invoices); // 确保在测试结束之前进行日志记录
}); 