import { faker } from "@faker-js/faker";

function createTestInfo() {
  return {
    name: faker.lorem.word(),
    pdfUrl: faker.internet.url(),
    categoryId: faker.datatype.number({ min: 1, max: 3 }),
    teacherDisciplineId: faker.datatype.number({ min: 1, max: 6 }),
  };
}

const testFactory = {
  createTestInfo,
};

export default testFactory;
