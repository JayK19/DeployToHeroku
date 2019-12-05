import Sequelize from 'sequelize';

/*
 * Connect to your database from within your application
 * 
 */

const sequelize = new Sequelize(
  process.env.TEST_DATABASE || process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

/*
 * In the same file, you can physically associate all your models with 
 * each other to expose them to your application as data access layer (models)
 * for the database.
 */


// sequelize.import(path: String) : Model // returns "Model" 
// Imports a model defined in another file. Imported models are 
// cached. So multiple calls to import with the same file
// will not load the file multiple times.
const models = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message'),
  //Message: [Function]
  /* Message: (sequelize, DataTypes) => {
      const Message = sequelize.define('message', {

      });

      Message.associate = models => {
        Message.belongsTo(models.User);
      };

      return Message;
    };
   */
};


/*
 * Object.keys():
 * const object1 = {
 *   a: 'something',
 *   b: 42,
 *   c: false
 * };
 * 
 * console.log(Object.keys(object1));
 * // expected output: Array ["a", "b", "c"]
 */

const modelsArray = Object.keys(models);
// Object.keys(models) ---> Array ["User", "Message"]

modelsArray.forEach(key => {
  // key => "User" or "Message"

  // models[key] is "User" object from "const User = sequelize.define('user', {...})"
  // "User" object have its own properties of functions and user defined functions as well.
  /*
  for (let f in models[key]) {
    console.log('functions: ', f);
  }
  */

  // Find the functions with specific name 'associate' in 'models[key]' 
  if ('associate' in models[key]) {
    models[key].associate(models);
  }

});

export { sequelize };

export default models;

/*
let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
    messageIds: [1],
  },
  2: {
    id: '2',
    username: 'Dave Davids',
    messageIds: [2],
  },
};

const me = users[1];

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: "2",
    text: "By World",
    userId: '2',
  },
};

export default {
  users,
  messages,
};

*/