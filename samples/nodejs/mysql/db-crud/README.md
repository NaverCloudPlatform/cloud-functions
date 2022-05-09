# Cloud DB for MySQL - 데이터 CRUD 수행 샘플 액션
## 연동 서비스 및 시나리오
### Cloud DB for MySQL(VPC)
+ Cloud Functions 콘솔에서 액션을 실행(invoke)하여 DB에 `Student(studentId, name, age)` 테이블 생성 및 데이터 삽입, 삭제, 갱신, 조회 등을 수행
+ [Cloud DB for MySQL 사용 가이드](https://guide.ncloud-docs.com/docs/database-database-5-2)

---
## 액션 Input Parameter
### DB 접속을 위한 공통 Input Parameter
+ `host` - Cloud DB for MySQL(VPC)의 Private Domain 정보
+ `user` - MySQL DB 접속을 위한 사용자 정보
+ `password` - MySQL DB 접속을 위한 사용자 정보
+ `database` - 접근 대상 MySQL DB 이름
+ `cdbTable` - 생성 또는 데이터 CRUD 연산 수행 대상이 되는 테이블 이름(본 샘플 액션에서의 Student)

### 테이블 생성(create-table)
+ 공통 Input Parameter 외 추가 정보 요구되지 않음

### 데이터 삽입(insert-data)
+ `studentId` - Student 테이블에 삽입할 데이터(학생)의 student Id 정보
+ `name` - Student 테이블에 삽입할 데이터(학생)의 name 정보
+ `age` - Student 테이블에 삽입할 데이터(학생)의 age 정보

### 데이터 삭제(delete-data)
+ `studentId` - 삭제하려는 데이터(학생)의 student Id 정보(Primary Key)

### 데이터 조회(select-all-data)
+ 공통 Input Parameter 외 추가 정보 요구되지 않음

### 데이터 갱신(updata-data)
+ `studentId` - 갱신하려는 데이터(학생)의 student Id 정보(Primary Key)
+ `name` - 갱신하려는 데이터(학생)의 name 정보
+ `age` - 갱신하려는 데이터(학생)의 age 정보

---
## 사용법
1. `npm install --production`
2. `zip -r action.zip *`
3. [NCP Console](console.ncloud.com)에서 액션 생성 시 `action.zip` 파일 업로드
4. 액션 실행을 위해서, Cloud DB for MySQL 서버 생성과 각 액션 별 요구되는 Input Parameter 입력 필요

---
## 액션 실행 결과 확인
+ Cloud Functions 콘솔에서 액션 실행 후 Cloud DB for MySQL과 연결된 app server에서 직접확인하거나, query 함수에서 results를 출력하는 등의 방법을 통해 실행 결과를 확인할 수 있습니다.
+ 특히 전체 데이터를 조회하는 select-all-data 액션의 경우, query 함수의 results에 데이터(학생) 정보 조회 결과가 담기는데, 이를 콘솔의 액션 실행 결과 화면에서 확인할 수 있습니다.
> <img width="205" alt="image" src="https://user-images.githubusercontent.com/104127073/167522899-851c53e9-27e4-428f-b959-3eab5f6e6037.png">

