import { GenericContainer, StartedTestContainer } from 'testcontainers';

const postgresContainer = new GenericContainer(
  'postgres-17:alpine',
).withEnvironment({
  POSTGRES_USER: 'test',
  POSTGRES_PASSWORD: 'test',
  POSTGRES_DB: 'testdb',
});
let container: StartedTestContainer;

beforeAll(async () => {
  container = await postgresContainer.withExposedPorts(5432).start();

  process.env.DATABASE_URL = `postgres://test:test@localhost:${container.getMappedPort(5432)}/testdb`;
});

afterAll(async () => {
  await container.stop();
});
