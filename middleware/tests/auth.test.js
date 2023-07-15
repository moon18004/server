import httpMocks from 'node-mocks-http';
import { isAuth } from '../auth.js';
import faker from 'faker';
import jwt from 'jsonwebtoken';
import * as userRepository from '../../data/auth.js';

jest.mock('jsonwebtoken');
jest.mock('../../data/auth.js');

describe('Auth Middleware', () =>{
  it('returns 401 for the request without Authorization header',async () => {
    // given
    const request = httpMocks.createRequest({
      method:'GET',
      url:'/community',
    });
    const reponse = httpMocks.createResponse();
    const next = jest.fn();

    // when
    await isAuth(request, reponse, next);

    // then
    expect(reponse.statusCode).toBe(401);
    expect(reponse._getJSONData().message).toBe('Authentication Error');
    expect(next).not.toBeCalled();
  });
  it('returns 401 for the request with unsupported Authorization header', async () => {
    // given
    const request = httpMocks.createRequest({
      method:'GET',
      url:'/community',
      headers: {Authoization: 'Basic'},
    });
    const reponse = httpMocks.createResponse();
    const next = jest.fn();

    // when
    await isAuth(request, reponse, next);

    // then
    expect(reponse.statusCode).toBe(401);
    expect(reponse._getJSONData().message).toBe('Authentication Error');
    expect(next).not.toBeCalled();
  });
  it('returns 401 for the request with invalid JWT', async () => {
    const token = faker.random.alphaNumeric(128);
    // given
    const request = httpMocks.createRequest({
      method:'GET',
      url:'/community',
      headers: {Authoization: `Bearer ${token}`},
    });
    const reponse = httpMocks.createResponse();
    const next = jest.fn();
    jwt.verify = jest.fn((token, secret, callback) => {
      callback(new Error('bad token'), undefined);
    });

    // when
    await isAuth(request, reponse, next);

    // then
    expect(reponse.statusCode).toBe(401);
    expect(reponse._getJSONData().message).toBe('Authentication Error');
    expect(next).not.toBeCalled();
  });
  it('returns 401 when cannot find a user by id from the JWT', async () => {
    const token = faker.random.alphaNumeric(128);
    const userId = faker.random.alphaNumeric(32);
    // given
    const request = httpMocks.createRequest({
      method:'GET',
      url:'/community',
      headers: {Authoization: `Bearer ${token}`},
    });
    const reponse = httpMocks.createResponse();
    const next = jest.fn();
    jwt.verify = jest.fn((token, secret, callback) => {
      callback(undefined, {id: userId});
    });
    userRepository.findById= jest.fn((id) => {
      Promise.resolve(undefined);
    })

    // when
    await isAuth(request, reponse, next);

    // then
    expect(reponse.statusCode).toBe(401);
    expect(reponse._getJSONData().message).toBe('Authentication Error');
    expect(next).not.toBeCalled();
  });
  it('passes a request with valid Authorization header with token', async () => {
    const token = faker.random.alphaNumeric(128);
    const userId = faker.random.alphaNumeric(32);
    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/community',
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();
    jwt.verify = jest.fn((token, secret, callback) => {
      callback(undefined, { id: userId });
    });
    userRepository.findById = jest.fn((id) => Promise.resolve({ id }));
    await isAuth(request, response, next);

    expect(request).toMatchObject({ userId, token });
    expect(next).toHaveBeenCalledTimes(1);
  });
})