# Cloud DB for MongoDB - 데이터 저장 샘플 액션
## 연동 서비스 및 시나리오
### Cloud DB for MongoDB(VPC)
+ MongoDB의 *books 콜렉션*에 책 정보(제목, 저자)를 저장하는 샘플 액션입니다.

+ MongoDB는 `stand-alone` 클러스터 타입으로 생성하여 진행합니다.

+ [Cloud DB for MongoDB 가이드](https://guide.ncloud-docs.com/docs/clouddbformongodb-overview)

---
## 액션 Input Parameter
+ `mongo_url` - MongoDB 접속을 위한 Private Domain
  - MongoDB 콘솔에서 확인 가능합니다.
  - `MongoDB 콘솔` - `DB 관리` - `DB User 관리`를 통해서 클러스터 내 DB 별 계정 정보 관리가 가능하며, 이를 이용하여 Url을 구성하게 됩니다.
+ `mongo_db_name` - MongoDB 클러스터에서 사용할 DB 이름 정보
+ `mongo_col_name` - 실제 데이터를 저장할 콜렉션(collection) 이름 정보
+ `book_title` - 저장할 책의 제목 정보
+ `book_author` - 저장할 책의 저자 정보

---
## 사용법
1. 사용하고자 하는 런타임(python:3.6 또는 python:3.7)과 동일한 버전의 python 가상 환경 *virtualenv*를 생성 및 활성화(activate)
2. python으로 MongoDB 접근 및 작업을 위한 `PyMongo` 라이브러리 설치 - **pip install pymongo**
3. [NCP Console](console.ncloud.com) VPC Platform에서 액션 생성 시 `action.zip` 파일 업로드하여 Action 생성

---
## 액션 실행 결과 확인
+ Cloud Functions 콘솔에서 액션을 직접 실행하거나, 외부 연결 주소, 트리거 등을 이용할 수도 있습니다.

+ [Cloud DB for MongoDB 가이드](https://guide.ncloud-docs.com/docs/clouddbformongodb-overview)를 참조하여 MongoDB에 접근 가능한 App 서버를 구성하고 접근하여, `db.books.find()` 명령어를 통해 간단히 확인할 수 있습니다.
> <img width="714" alt="image" src="https://user-images.githubusercontent.com/104127073/167882253-7d3c75c1-9949-4647-bbbe-55de9120aeb4.png">