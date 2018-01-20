import * as dotenv from 'dotenv';

import * as Hapi from 'hapi';
import * as Boom from 'boom';
import * as Good from 'good';
import * as Blipp from 'blipp';
import * as Inert from 'inert';
import * as Vision from 'vision';
import * as HapiSwagger from 'hapi-swagger';

dotenv.load();

const data = require(process.env['DATA_FILE'] || '../../data.json');
const server = new Hapi.Server();

server.connection({
    host: process.env['APP_HOST'] || 'localhost',
    port: process.env['APP_PORT'] || 8000
  });

let goodOptions = {
  ops: {
    interval: Number(process.env['OPS_INTERVAL']) || 10000
  },
  reporters: {
    console: [
      {
        module: 'good-console',
        args: [{ request: '*', response: '*' }]
      },
      'stdout'
    ]
  }
}

server.register([
  {
    register: require('good'),
    options: goodOptions,
  },
  Blipp,
  Inert,
  Vision,
  HapiSwagger
  ],
  err => {

    server.route({
      method: 'GET',
      path: '/users',
      config: {
        tags: ['api'],
        handler: (request, reply) => {
          return reply({
            data: data.users
          });
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/users/{id}/profile',
      config: {
        tags: ['api'],
        handler: (request, reply) => {
          const id = request.params.id;
          const user = data.users.find((user) => user.id.toString() === id);

          if (user) {
            return reply({ data: user });
          } else {
            return reply(Boom.notFound('User not found.'));
          }
        }
      }
    });

    server.start((err) => {
      if (err) {
        throw err;
      }
      console.log(`Started at: ${server.info ? server.info.uri : ''}`);
    })

});


