import { fetchCustomers, fetchInvoices } from './local-postgres-example';
import { Client } from 'pg';
import { jest } from '@jest/globals';

describe('Database Operations', () => {
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
    await client.end();
  });

  test('fetchCustomers should return customer list', async () => {
    const customers = await fetchCustomers(client);
    expect(Array.isArray(customers)).toBe(true);
    expect(customers.length).toBeGreaterThan(0);
  });

  test('fetchInvoices should return invoice list', async () => {
    const invoices = await fetchInvoices(client);
    expect(Array.isArray(invoices)).toBe(true);
    expect(invoices.length).toBeGreaterThan(0);
  });
});