import faker from 'faker';
import { CommunityController } from '../community.js';
import httpMocks from 'node-mocks-http';

describe("CommunityController", () =>{
  let communityRepository;
  let communityController;
  beforeEach(() => {
    communityRepository = {};
    communityController = new CommunityController(communityRepository);
  });
  
  describe('getPosts', () => {
    it('returns all posts when username is not provided', async () => {
      const request = httpMocks.createRequest();
      const response = httpMocks.createResponse();
      const allCommunity = [
        { text: faker.random.words(3) },
        { text: faker.random.words(3) },
      ];
      communityRepository.getAll = () => allCommunity;

      await communityController.getPosts(request, response);

      expect(response.statusCode).toBe(200);
      expect(response._getJSONData()).toEqual(allCommunity);
    });
    it('returns posts for the given user when username is provided', async () => {
      const username = faker.internet.userName();
      const request = httpMocks.createRequest({
        query: { username },
      });
      const response = httpMocks.createResponse();
      const userCommunity = [{ text: faker.random.words(3) }];
      communityRepository.getAllByUsername = () => userCommunity;

      await communityController.getPosts(request, response);

      expect(response.statusCode).toBe(200);
      expect(response._getJSONData()).toEqual(userCommunity);
    });
  });
  describe('createPost', () => {
    let obj, mainText, title, category, authorId, request, response;
    beforeEach(() => {
      mainText = faker.random.words(3);
      title = faker.random.words(3);
      category = faker.random.words(1);
      obj = { category: category, title: title, mainText: mainText }
      authorId = faker.random.alphaNumeric(16);
      request = httpMocks.createRequest({
        body: obj,
        userId: authorId,
      });
      response = httpMocks.createResponse();
    });

    it('returns 201 with created post object including userId', async () => {
      communityRepository.create = jest.fn((text, userId) => ({
        text,
        userId,
      }));

      await communityController.create(request, response);

      expect(response.statusCode).toBe(201);
      expect(response._getJSONData()).toMatchObject({
        text: obj,
        userId: authorId,
      });
      expect(communityRepository.create).toHaveBeenCalledWith(obj, authorId);
    });
  });
  describe('updatePost', () => {
    let obj, updatedTitle, updatedCategory, postId, updatedText, request, response, authorId;
    beforeEach(() => {
      postId = faker.random.alphaNumeric(16);
      updatedText = faker.random.words(3);
      updatedTitle = faker.random.words(3);
      updatedCategory = faker.random.words(1);
      obj = { category: updatedCategory, title: updatedTitle, mainText: updatedText }
      authorId = faker.random.alphaNumeric(16);
      request = httpMocks.createRequest({
        params: { id: postId },
        body: obj,
        userId: authorId,
      });
      response = httpMocks.createResponse();
    });

    it('updates the repository and return 200', async () => {
      communityRepository.getById = () => ({
        text: faker.random.words(3),
        userId: authorId,
      });
      communityRepository.update = (postId, obj) => (obj);

      await communityController.updatePost(request, response);

      expect(response.statusCode).toBe(200);
      expect(response._getJSONData()).toMatchObject(obj);
    });

    it('returns 403 and should not update the repository if the Post does not belong to the user', async () => {
      communityRepository.getById = () => ({
        text: faker.random.words(3),
        userId: faker.random.alphaNumeric(16),
      });
      communityRepository.update = jest.fn();

      await communityController.updatePost(request, response);

      expect(response.statusCode).toBe(403);
    });
  });
  describe('deletePost', () => {
    let postId, request, response, authorId;
    beforeEach(() => {
      postId = faker.random.alphaNumeric(16);
      authorId = faker.random.alphaNumeric(16);
      request = httpMocks.createRequest({
        params: { id: postId },
        userId: authorId,
      });
      response = httpMocks.createResponse();
    });

    it('returns 204 and remove the Post from the repository if the Post exists', async () => {
      communityRepository.getById = () => ({
        userId: authorId,
      });
      communityRepository.remove = jest.fn();

      await communityController.deletePost(request, response);

      expect(response.statusCode).toBe(204);
      expect(communityRepository.remove).toHaveBeenCalledWith(postId);
    });

    it('returns 403 and should not update the repository if the Post does not belong to the user', async () => {
      communityRepository.getById = () => ({
        userId: faker.random.alphaNumeric(16),
      });
      communityRepository.remove = jest.fn();

      await communityController.deletePost(request, response);

      expect(response.statusCode).toBe(403);
      expect(communityRepository.remove).not.toHaveBeenCalled();
    });
  });
})
