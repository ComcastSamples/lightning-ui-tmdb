import fetchMock from 'jest-fetch-mock';
import api from 'src/api';
import configuration from 'test/mocks/configuration.json';
import trending from 'test/mocks/trending.json';

import movieCredits from 'test/mocks/movieCredits.json';
import movieEntity from 'test/mocks/movieEntity.json';
import movieRecommendations from 'test/mocks/movieRecommendations.json';

import tvCredits from 'test/mocks/tvCredits.json';
import tvEntity from 'test/mocks/tvEntity.json';
import tvRecommendations from 'test/mocks/tvRecommendations.json';

import routerConfig from 'src/routes.js';

fetchMock.enableMocks();

const RESPONSES = {
  configuration: JSON.stringify(configuration),
  trending: JSON.stringify(trending),
  movieCredits: JSON.stringify(movieCredits),
  movieEntity: JSON.stringify(movieEntity),
  movieRecommendations: JSON.stringify(movieRecommendations),
  tvCredits: JSON.stringify(tvCredits),
  tvEntity: JSON.stringify(tvEntity),
  tvRecommendations: JSON.stringify(tvRecommendations),
}

global.getRoute = function(path) {
  return routerConfig.routes.find(route => route.path === path);
}

fetch.mockResponse(req => {
  if (req.url.match(/trending/)) {
    return Promise.resolve(RESPONSES.trending);
  }

  if (req.url.match(/movie\/\d+\/recommendations/)) {
    return Promise.resolve(RESPONSES.movieRecommendations);
  }

  if (req.url.match(/movie\/\d+\/credits/)) {
    return Promise.resolve(RESPONSES.movieCredits);
  }

  if (req.url.match(/movie\/\d+$/)) {
    return Promise.resolve(RESPONSES.movieEntity);
  }

  if (req.url.match(/tv\/\d+\/recommendations/)) {
    return Promise.resolve(RESPONSES.tvRecommendations);
  }

  if (req.url.match(/tv\/\d+\/credits/)) {
    return Promise.resolve(RESPONSES.tvCredits);
  }

  if (req.url.match(/tv\/\d+$/)) {
    return Promise.resolve(RESPONSES.tvEntity);
  }

  if (req.url.match(/configuration/)) {
    return Promise.resolve(RESPONSES.configuration);
  }

  return Promise.reject("{}");
});

api.loadConfig();
