# graphql-study

본 repository는 nomadcoder의 [graphql로 영화 api 만들기 강의](https://nomadcoders.co/graphql-for-beginners)를 참고하여 작성되었습니다.

## What GraphQL want to solve?

크게 아래의 두가지 문제를 해결했다고 말을 한다.

- over fetching
- under fetching

### Over Fetching

rest api를 호출할 때를 예를 들어보자.

어떤 유저에 대한 정보를 가져올 때, 가장 처음 화면에서 나오는 유저에 대한 이름을 가져온다고 하자.

rest api는 이때 `/users/` 와같은 api를 호출할 것이며, 이 경우 이름을 제외한 다른 정보들은 가져오지만 (`fetching`) 사용하지 않게 된다. 예를 들자면 주소나 성별 정보, 프로필 사진 정보등이 이에 해당한다.

이럴 경우 Database가 쓸데 없는 영역을 보게 만들고, 고객들이 앱에서 필요도 없는 정보들을 받아 버리게 된다.

이러한 문제를 **over fetching**이라고 한다.

### Under Fetching

인스타그램을 예로들어 보자.

인스타 그램에는 한 페이지에 feed 정보나 알람정보, 유저의 정보 등이 한꺼번에 필요로 하는데, 이럴 경우 아래와 같은 rest api의 호출이 필요할 것이다.

- `/feed/`
- `/notifications/`
- `/user/1`

## How to solve?

QraphQL에서는 이러한 문제를 클라이언트가 필요로하는 정보를 한꺼번에 요청할 수 있게 함으로서 해결한다.

Over Fetching 문제의 경우 아래와 같이 query를 날리면

```graphql
query {
  user {
    name
  }
}
```

아래와 같이 response가 온다.

```graphql
{
  user: {
    name: "yunho"
  }
}
```

Under Fetching 의 경우 아래와 같이 여러개의 쿼리를 동시에 날릴 수 있게함으로서 해결한다.

```graphql
query {
  feed {
    comments
    linkeNumber
  }
  notifications {
    isRead
  }
  user {
    username
    profilePic
  }
}
```

위 와 같이 여러 종류의 쿼리를 동시에 날릴 수 있고, 아래와 같이 response를 받아볼 수 있다.

```graphql
{
  feed : [
    {
      comments: 1,
      linkeNumber: 20
    }
  ],
  notifications : [
    {
      isRead: true
    },
    {
      isRead: false
    }
  ],
  user : {
    username: "yunho"
    profilePic: "http://example.com/pic.jpg"
  }
```

좋은 점은 request와 response의 전송이 매우 유사한 꼴을 뛰기 때문에 읽기 편리한것도 같다.

## 설정

### 설치

```console
npm install --global yarn
yarn add @babel/cli @babel/core @babel/node @babel/preset-env graphql-yoga
yarn add babel-preset-env babel-preset-stage-3
```

### babelrc 설정

`.bablerc`

```json
{
  "presets": ["@babel/preset-env"]
}
```

### package.json 작성

`package.json`

```json
{
  "name": "graphql-study",
  "version": "1.0.0",
  "description": "Movie API with Graphql - nomadcoders",
  "repository": "https://github.com/choiking10/graphql-study",
  "author": "Yunho Choi <choiking10@gmail.com>",
  "type": "module",
  "license": "MIT",
  "dependencies": {
    "@babel/cli": "^7.12.10",
    "@babel/core": "^7.12.10",
    "@babel/node": "^7.12.10",
    "@babel/preset-env": "^7.12.11",
    "graphql-yoga": "^1.18.3"
  },
  "scripts": {
    "start": "nodemon --exec babel-node index.js"
  },
  "devDependencies": {
    "babel-preset-env": "^1.7.0",
    "babel-preset-stage-3": "^6.24.1"
  }
}
```

## Query and Resolver

어쨌든 CRUD 연산인데 `Query`는 Read에 해당함.
즉 Query는 Database로부터 정보를 얻는것으로 정보를 받을 때 사용함.

Create Uupdate Delete에 해당하는 것은 `Mutation`임.
Mutation은 Database에서, 혹은 메모리에서 정보를 바꾸는 작업을 할 때 사용함.

### Query

schema.graphql

```graphql
type Query {
  name: String!
}
```

resolvers.js

```js
const resolvers = {
  Query: {
    name: () => "yunho",
  },
};

export default resolvers;
```

index.js

```js
//...
import resolvers from "./graphql/resolvers.js";
//...
const server = new GraphQLServer({
  typeDefs: "./graphql/schema.graphql",
  resolvers,
});
//...
```

이제 `yarn start`를 수행한후 `127.0.0.1:4000` 에 들어가보자.
![query result](images/2021-01-24-12-14-15.png)

awesome!
