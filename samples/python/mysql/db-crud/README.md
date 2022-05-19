# Cloud DB for MySQL - 데이터 CRUD 수행 샘플 액션
## 연동 서비스 및 시나리오
### Cloud DB for MySQL(VPC)
+ Cloud Functions 콘솔에서 액션을 실행(invoke)하여 DB에 `Student(studentId, name, age)` 테이블 생성 및 데이터 삽입, 삭제, 갱신, 조회 등을 수행합니다.

    |Attribute 이름|데이터 타입|비고|
    |------|---|---|
    |studentId|INT|NOT NULL, PK|
    |name|VARCHAR(50)|NOT NULL|
    |age|INT|NOT NULL|

+ [Cloud DB for MySQL 사용 가이드](https://guide.ncloud-docs.com/docs/database-database-5-2)

---
## 액션 Input Parameter
### DB 접속을 위한 공통 Input Parameter
+ 하기의 DB 접속 정보는 `Cloud DB for MySQL 콘솔의 서버 목록`에서 확인 가능합니다.
+ `cdb_host` - Cloud DB for MySQL(VPC)의 Private Domain 정보
+ `cdb_user` - MySQL DB 접속을 위한 사용자 정보
+ `cdb_pass` - MySQL DB 접속을 위한 사용자 정보
+ `cdb_database` - 접근 대상 MySQL DB 이름
+ `cdb_table` - 생성 또는 데이터 CRUD 연산 수행 대상이 되는 테이블 이름(본 샘플 액션에서의 Student)

### 테이블 생성(create-table)
+ 공통 Input Parameter 외 추가 정보 요구되지 않습니다.

### 데이터 삽입(insert-data)
+ `student_id` - Student 테이블에 삽입할 데이터(학생)의 student Id 정보
+ `name` - Student 테이블에 삽입할 데이터(학생)의 name 정보
+ `age` - Student 테이블에 삽입할 데이터(학생)의 age 정보

### 데이터 삭제(delete-data)
+ `student_id` - 삭제하려는 데이터(학생)의 student Id 정보(Primary Key)

### 데이터 조회(select-all-data)
+ 공통 Input Parameter 외 추가 정보 요구되지 않습니다.

### 데이터 갱신(update-data)
+ `student_id` - 갱신하려는 데이터(학생)의 studentId 정보(Primary Key)
+ `name` - 갱신하려는 데이터(학생)의 name 정보
+ `age` - 갱신하려는 데이터(학생)의 age 정보

---
## 사용법
1. 사용하고자 하는 런타임(python:3.6 또는 python:3.7)과 동일한 버전의 python 가상 환경 *virtualenv*를 생성 및 활성화(activate)
2. python으로 MySQL 접근 및 작업을 위한 `PyMySQL` 라이브러리 설치 - **pip install pymysql**
3. [NCP Console](console.ncloud.com) VPC Platform에서 액션 생성 시 `action.zip` 파일 업로드하여 Action 생성

---
## 액션 실행 결과 확인
+ Cloud Functions 콘솔에서 액션 실행 후 Cloud DB for MySQL과 연결된 app server에서 직접 확인하거나, `테이블 생성 - 데이터 삽입 - 데이터 조회 - 데이터 갱신 - 데이터 조회 - 데이터 삭제 - 데이터 조회` 등의 순서로 액션을 실행하며, 콘솔에서의 액션 실행 결과를 통해서 확인하는 방법을 추천드립니다.

+ 데이터 조회(select-all-data) 액션 실행 결과 예시
> <img width="205" alt="image" src="https://user-images.githubusercontent.com/104127073/167522899-851c53e9-27e4-428f-b959-3eab5f6e6037.png">