# 두軍두軍 상담소 ![license](https://img.shields.io/bower/l/react)

![Logo](./readme/logo.png)

<br/>

## 프로젝트 시연 동영상
[![Thumbnail](./readme/video.png)]("https://youtu.be/TA9kBvD3mos")

> 이미지를 클릭하시면 이동합니다.

<br/>

## 프로젝트 설계 과정

### <a href="https://www.notion.so/OSAM-66aec75349664b6693f56ad80575f903"><img src="https://cdn.icon-icons.com/icons2/2389/PNG/512/notion_logo_icon_145025.png" width=30/></a> Notion

> 팀원 간 프로젝트 진행과 관련된 이슈 공유 및 임무 분담

![Notion](./readme/notion.png)

<br/>

### <a href="https://beecanvas.com/s/61Hk2QZQV8gctG3M10Z3leIbGCS0DalxOeH_aWvhZrVXu7dzfXvxE-SvwGon8Rwr"><img src="https://image.winudf.com/v2/image1/Y29tLmpva2VycGFja2luYy5iZWVjYW52YXNfaWNvbl8xNTUzOTQ1MDM1XzA1NA/icon.png?w=340&fakeurl=1" width=30/></a> BeeCanvas - 사용자 스토리 작성

> 팀원 간 대면하여 소통하기에 제한이 있으므로 공유된 이해를 갖기 위해 스토리 작성을 진행하며 회의 진행

![Story](./readme/story.png)

<br/>

### Figma 사용하여 디자인 작업 진행

> 정해진 스토리를 기반으로 디자인 작업 진행

![design](./readme/figma.png)

<br/>

### ERD 작성

> 두군두군 상담소 서비스에 필요한 데이터베이스 구조를 잡기위해 ERD 작성

![erd](./readme/erd_final.png)

<br/>

### [GraphQL Schema](https://api.4rmy.app/playground) 작성

> 서버와 클라이언트가 Schema를 공유함으로써 협업 상태를 유지할 수 있도록 함.

```graphql
schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

type CareerNode implements Node {
  id: ID!
  user: UserNode!
  title: String!
}

type CareerNodeConnection {
  pageInfo: PageInfo!
  edges: [CareerNodeEdge]!
}

type CareerNodeEdge {
  node: CareerNode
  cursor: String!
}

type ChatNode implements Node {
  id: ID!
  counsel: CounselNode!
  writer: UserNode!
  content: String!
  sent: Date!
  read: Boolean!
}

type ChatNodeConnection {
  pageInfo: PageInfo!
  edges: [ChatNodeEdge]!
}

type ChatNodeEdge {
  node: ChatNode
  cursor: String!
}

input ChatSendInput {
  counselId: ID!
  content: String!
  clientMutationId: String
}

type ChatSendPayload {
  chatEdge: CounselChatEdge
  clientMutationId: String
}

input CommentCreateInput {
  postId: String!
  content: String!
  clientMutationId: String
}

type CommentCreatePayload {
  commentEdge: CommentEdge
  clientMutationId: String
}

input CommentDeleteInput {
  commentId: String!
  clientMutationId: String
}

type CommentDeletePayload {
  ok: Boolean
  id: ID
  clientMutationId: String
}

type CommentEdge {
  node: CommentNode
  cursor: String
}

type CommentNode implements Node {
  id: ID!
  user: UserNode!
  post: PostNode!
  content: String!
  created: Date!
  isPrivate: Boolean!
  viewerCanEditComment: Boolean
}

type CommentNodeConnection {
  pageInfo: PageInfo!
  edges: [CommentNodeEdge]!
}

type CommentNodeEdge {
  node: CommentNode
  cursor: String!
}

type CounselChatEdge {
  node: ChatNode
  cursor: String!
}

type CounselNode implements Node {
  id: ID!
  counselor: UserNode!
  client: UserNode!
  status: Int!
  chatSet(before: String, after: String, first: Int, last: Int): ChatNodeConnection!
}

type CounselNodeConnection {
  pageInfo: PageInfo!
  edges: [CounselNodeEdge]!
}

type CounselNodeEdge {
  node: CounselNode
  cursor: String!
}

input CounselStartInput {
  counselorId: ID!
  clientMutationId: String
}

type CounselStartPayload {
  counsel: CounselNode
  clientMutationId: String
}

input CounselStatusUpdateInput {
  counselId: ID!
  status: Int!
  clientMutationId: String
}

type CounselStatusUpdatePayload {
  counsel: CounselNode
  clientMutationId: String
}

type CounselorConnection {
  pageInfo: PageInfo!
  edges: [CounselorEdge]!
}

type CounselorEdge {
  node: UserNode
  cursor: String!
}

scalar Date

scalar DateTime

input DeleteJSONWebTokenCookieInput {
  clientMutationId: String
}

type DeleteJSONWebTokenCookiePayload {
  deleted: Boolean!
  clientMutationId: String
}

input DeleteRefreshTokenCookieInput {
  clientMutationId: String
}

type DeleteRefreshTokenCookiePayload {
  deleted: Boolean!
  clientMutationId: String
}

scalar GenericScalar

type LikeNode implements Node {
  id: ID!
  user: UserNode!
  post: PostNode!
}

type LikeNodeConnection {
  pageInfo: PageInfo!
  edges: [LikeNodeEdge]!
}

type LikeNodeEdge {
  node: LikeNode
  cursor: String!
}

input LikeToggleInput {
  postId: String!
  clientMutationId: String
}

type LikeTogglePayload {
  post: PostNode
  clientMutationId: String
}

type MessageSent {
  chatEdge: CounselChatEdge
}

type Mutation {
  userCreate(input: UserCreateInput!): UserCreatePayload
  userProfileImgSet(input: UserProfileImgSetInput!): UserProfileImgSetPayload
  userInfoUpdate(input: UserInfoUpdateInput!): UserInfoUpdatePayload
  postCreate(input: PostCreateInput!): PostCreatePayload
  postUpdate(input: PostUpdateInput!): PostUpdatePayload
  postDelete(input: PostDeleteInput!): PostDeletePayload
  likeToggle(input: LikeToggleInput!): LikeTogglePayload
  commentCreate(input: CommentCreateInput!): CommentCreatePayload
  commentDelete(input: CommentDeleteInput!): CommentDeletePayload
  authToken(input: ObtainJSONWebTokenInput!): ObtainJSONWebTokenPayload
  verifyToken(input: VerifyInput!): VerifyPayload
  refreshToken(input: RefreshInput!): RefreshPayload
  revokeToken(input: RevokeInput!): RevokePayload
  deleteTokenCookie(input: DeleteJSONWebTokenCookieInput!): DeleteJSONWebTokenCookiePayload
  deleteRefreshTokenCookie(input: DeleteRefreshTokenCookieInput!): DeleteRefreshTokenCookiePayload
  chatSend(input: ChatSendInput!): ChatSendPayload
  counselStart(input: CounselStartInput!): CounselStartPayload
  counselStatusUpdate(input: CounselStatusUpdateInput!): CounselStatusUpdatePayload
}

interface Node {
  id: ID!
}

input ObtainJSONWebTokenInput {
  clientMutationId: String
  email: String!
  password: String!
}

type ObtainJSONWebTokenPayload {
  payload: GenericScalar!
  refreshExpiresIn: Int!
  user: UserNode
  clientMutationId: String
  token: String!
  refreshToken: String!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type PostConnection {
  pageInfo: PageInfo!
  edges: [PostEdge]!
}

input PostCreateInput {
  title: String!
  content: String!
  tags: String!
  isPrivate: Boolean
  clientMutationId: String
}

type PostCreatePayload {
  postEdge: PostEdge
  clientMutationId: String
}

input PostDeleteInput {
  postId: String!
  clientMutationId: String
}

type PostDeletePayload {
  ok: Boolean
  id: ID
  clientMutationId: String
}

type PostEdge {
  node: PostNode
  cursor: String!
}

type PostNode implements Node {
  id: ID!
  user: UserNode!
  title: String!
  content: String!
  created: Date!
  isPrivate: Boolean!
  tagSet(before: String, after: String, first: Int, last: Int, name_Icontains: String): TagNodeConnection!
  commentSet(before: String, after: String, first: Int, last: Int): CommentNodeConnection!
  likeSet(before: String, after: String, first: Int, last: Int): LikeNodeConnection!
  likes: Int
  viewerAlreadyLiked: Boolean
  viewerCanEditPost: Boolean
}

type PostNodeConnection {
  pageInfo: PageInfo!
  edges: [PostNodeEdge]!
}

type PostNodeEdge {
  node: PostNode
  cursor: String!
}

input PostUpdateInput {
  id: ID!
  title: String!
  content: String!
  tags: String!
  clientMutationId: String
}

type PostUpdatePayload {
  ok: Boolean
  post: PostNode
  clientMutationId: String
}

type Query {
  node(id: ID!): Node
  user(id: ID!): UserNode
  post(id: ID!): PostNode
  tag(id: ID!): TagNode
  counsel(id: ID!): CounselNode
  chat(id: ID!): ChatNode
  career(id: ID!): CareerNode
  users(before: String, after: String, first: Int, last: Int, email_Icontains: String, division_Icontains: String, rank_Icontains: String, isCounselor: Boolean): UserNodeConnection
  tags(name_Icontains: String, before: String, after: String, first: Int, last: Int): TagConnection
  posts(before: String, after: String, first: Int, last: Int): PostConnection
  counselors(before: String, after: String, first: Int, last: Int): CounselorConnection
  getUserFromEmail(email: String!): UserNode
}

input RefreshInput {
  # refreshToken: String
  clientMutationId: String
}

type RefreshPayload {
  payload: GenericScalar!
  refreshExpiresIn: Int!
  clientMutationId: String
  token: String!
  refreshToken: String!
}

input RevokeInput {
  # refreshToken: String
  clientMutationId: String
}

type RevokePayload {
  revoked: Int!
  clientMutationId: String
}

type Subscription {
  messageSent(counselId: ID!): MessageSent
}

type TagConnection {
  pageInfo: PageInfo!
  edges: [TagEdge]!
}

type TagEdge {
  node: TagNode
  cursor: String!
}

type TagNode implements Node {
  id: ID!
  posts(before: String, after: String, first: Int, last: Int, created_Gte: Date, created_Lte: Date, title_Icontains: String, content_Icontains: String): PostNodeConnection!
  name: String!
}

type TagNodeConnection {
  pageInfo: PageInfo!
  edges: [TagNodeEdge]!
}

type TagNodeEdge {
  node: TagNode
  cursor: String!
}

input UserCreateInput {
  email: String!
  password: String!
  passwordRepeat: String!
  division: String!
  rank: String!
  clientMutationId: String
}

type UserCreatePayload {
  ok: Boolean
  clientMutationId: String
}

enum UserDivision {
  ROKA
  ROKN
  ROKAF
  ROKM
  MND
  CIVIL
}

input UserInfoUpdateInput {
  nickname: String
  bio: String
  careers: String
  rank: String
  division: String
  clientMutationId: String
}

type UserInfoUpdatePayload {
  user: UserNode
  clientMutationId: String
}

type UserNode implements Node {
  id: ID!
  lastLogin: DateTime
  email: String!
  imgUri: String!
  nickname: String!
  bio: String!
  division: UserDivision!
  rank: UserRank!
  isCounselor: Boolean!
  postSet(before: String, after: String, first: Int, last: Int, created_Gte: Date, created_Lte: Date, title_Icontains: String, content_Icontains: String): PostNodeConnection!
  commentSet(before: String, after: String, first: Int, last: Int): CommentNodeConnection!
  likeSet(before: String, after: String, first: Int, last: Int): LikeNodeConnection!
  counselCounselor(before: String, after: String, first: Int, last: Int): CounselNodeConnection!
  counselClient(before: String, after: String, first: Int, last: Int): CounselNodeConnection!
  chatSet(before: String, after: String, first: Int, last: Int): ChatNodeConnection!
  careerSet(before: String, after: String, first: Int, last: Int): CareerNodeConnection!
}

type UserNodeConnection {
  pageInfo: PageInfo!
  edges: [UserNodeEdge]!
}

type UserNodeEdge {
  node: UserNode
  cursor: String!
}

input UserProfileImgSetInput {
  imgUri: String
  clientMutationId: String
}

type UserProfileImgSetPayload {
  user: UserNode
  clientMutationId: String
}

enum UserRank {
  PVT
  PFC
  CPL
  SGT
  SSG
  SFC
  MSG
  SMA
  CWO
  SLT
  LT
  CPT
  MAJ
  LCL
  COL
  BG
  MG
  LG
  GEN
  NON
}

input VerifyInput {
  # token: String
  clientMutationId: String
}

type VerifyPayload {
  payload: GenericScalar!
  clientMutationId: String
}
```



<br/>

## 컴퓨터 구성 / 필수 조건 안내


<br/>

## 기술 스택
### Back-end
 -  [Django](https://www.djangoproject.com/)
 - [Graphene](https://graphene-python.org/)
 - [Django GraphQL JWT](https://django-graphql-jwt.domake.io/en/latest/)

<br/>

### Front-end
 -  [React.js](https://reactjs.org/)
 -  [Typescript](https://www.typescriptlang.org/)
 - [GraphQL Relay](https://relay.dev/)

<br/>

### Deploy

* [Docker](https://www.docker.com/)
* [Google Cloud Run](https://cloud.google.com/run)
* [Nginx](https://www.nginx.com/)

<br/>

## 설치 안내 (Installation Process)

* **Python(3.8.5)**, **Node.JS LTS(12.19.0)**, **Go (1.13)** 정도가 설치되어 있어야합니다.

```bash
# Repository Clone
git clone https://github.com/osamhack2020/web_4rmyclinic_yukhaejinmi

# 1) Django Server Setting
cd server
pip install -r requirements.txt
cd clinic
python manage.py makemigrations
python manage.py migrate
python manage.py loaddata fixture.json # To load sample data
python manage.py runserver


# 2) React Client Setting
pwd 				# Web_4rmyClinic_YukHaeJinmi
cd client/react
touch .env.endpoint
# REACT_APP_DEV_SERVER=http://localhost:8000 또는 개발환경에서 사용하는 장고 서버 주소를 입력해야합니다.
npm i
npm run relay -- --watch # watch 모드를 실행하려면 watchman이 설치되어있어야합니다.
npm run dev
		# npm start는 배포되어있는 서버와 연결됩니다.
		# npm run dev는 REACT_APP_DEV_SERVER 에서 실행되고 있는 장고 서버와 연결됩니다.
```

<br/>

## 프로젝트 사용법 (Getting Started)

TODO

<br/>

## 팀 정보 (Team Information)
- 이성빈 (lee@sungbin.dev), Github: [@leesungbin](https://github.com/leesungbin)
- 홍유준 (hyjhyj0901@gmail.com), Github: [@Kick-snare](https://github.com/kick-snare)
- 이준영 (rubinstory@naver.com), Github: [@rubinstory](https://github.com/rubinstory)
- 박동한 (donghanpark@naver.com), Github: [@donghanpark](https://github.com/donghanpark)

<br/>

## 저작권 및 사용권 정보 (Copyleft / End User License)
 * [MIT](https://github.com/osam2020-WEB/Sample-ProjectName-TeamName/blob/master/license.md)
