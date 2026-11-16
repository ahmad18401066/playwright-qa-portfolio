import { test, expect } from '@playwright/test';

const API = 'https://jsonplaceholder.typicode.com';

test('GET /posts returns 100 posts with status 200', async ({ request }) => {
  const response = await request.get(`${API}/posts`);
  expect(response.status()).toBe(200);
  const posts = await response.json();
  expect(posts).toHaveLength(100);
  expect(posts[0]).toHaveProperty('id');
  expect(posts[0]).toHaveProperty('title');
});

test('GET /posts/1 returns the post with id 1', async ({ request }) => {
  const response = await request.get(`${API}/posts/1`);
  expect(response.status()).toBe(200);
  const post = await response.json();
  expect(post.id).toBe(1);
  expect(post.userId).toBe(1);
  expect(typeof post.title).toBe('string');
});

test('POST /posts creates a post and returns status 201', async ({ request }) => {
  const response = await request.post(`${API}/posts`, {
    data: { title: 'QA portfolio test', body: 'Created by a Playwright API test', userId: 1 },
  });
  expect(response.status()).toBe(201);
  const created = await response.json();
  expect(created.title).toBe('QA portfolio test');
  expect(created).toHaveProperty('id');
});
