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
