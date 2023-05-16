# RestAPI BackEnd 구성 웹 액션 샘플
## 연동 서비스 및 시나리오
### Cloud DB for MySQL(VPC)
+ [Cloud DB for MySQL과 Cloud Functions를 활용한 DB 구성 및 CRUD 샘플 액션](https://github.com/NaverCloudPlatform/cloud-functions/tree/master/samples/nodejs/mysql/db-crud)과 이어지는 내용입니다.

+ HTTP Rest API를 활용하여, 구성한 DB에 학생 정보를 추가하거나 조회, 삭제, 갱신 등(CRUD)을 수행합니다.

+ 액션에서 Request 정보를 활용할 수 있도록 `Cloud Functions 웹 액션`을 이용합니다.

+ 웹 액션의 외부 연결 주소는 `{invokeUrl}/{type+}`의 형태를 보이며, 본 샘플 액션 시나리오에서 `type+`는 `http`로 상정합니다.

+ [Cloud Functions 웹 액션 가이드](https://guide.ncloud-docs.com/docs/compute-compute-15-7)

+ [Cloud DB for MySQL 사용 가이드](https://guide.ncloud-docs.com/docs/database-database-5-2)


---
## 액션 Input Parameter
### DB 접속을 위한 필수 Input Parameter
+ `cdbHost` - Cloud DB for MySQL(VPC)의 Private Domain 정보
+ `cdbUser` - MySQL DB 접속을 위한 사용자 정보
+ `cdbPass` - MySQL DB 접속을 위한 사용자 정보
+ `cdbDatabase` - 접근 대상 MySQL DB 이름
+ `cdbTable` - 생성 또는 데이터 CRUD 연산 수행 대상이 되는 테이블 이름(본 샘플 액션에서의 student)

### RestAPI 메소드에 따라서 요구되는 Input Parameter
+ API 개발을 위해 필요한 Input Parameter는, Request Body를 통해 액션의 `main`으로 전달됩니다.
+ 각 메소드에 따라서 Request Body 필요 여부, 구성 등이 달라지며 예시는 다음과 같습니다.

    ```
    * POST /students
        - DB의 student 테이블에 요청된 학생 정보 저장
        - body 예시
        {
            "studentId": 12345678,
            "name": "cloud-functions",
            "age": 15
        }

    * GET /students/{studentId}
        - 요청된 학생 정보 조회

    * PUT /students/{studentId}
        - 요청된 학생 정보 갱신
        - body 예시
        {
            "name": "cloud-functions-updated",
            "age": 20
        }
        
    * DELETE /students/{studentId}
        - 요청된 학생 정보 제거
    ```

---
## 사용법
1. `npm install --production`
2. `zip -r action.zip *`
3. [NAVER Cloud Platform Console](console.ncloud.com)에서 액션 생성 시 `action.zip` 파일 업로드
4. 상기 `액션 Input Parameter`를 참고하여, 브라우저나 [Postman](https://www.postman.com)과 같은 도구를 활용하여 웹 액션을 호출할 수 있습니다.

---
## 액션 실행 결과 확인
+ 본 샘플 액션은 모든 경우의 에러 처리를 하고 있지 않으며, HTTP Status Code 또한 다소 간략히 표현되고 있습니다.

+ 따라서 상기 `액션 Input Parameter`를 참고하여 생성, 조회, 갱신, 조회, 삭제와 같은 순서로 테스트를 진행하는 것을 추천드리며, 이때 HTTP Response Body를 확인하며 유효한 실행을 확인할 수 있습니다.

+ 또한 [Cloud DB for MySQL과 Cloud Functions를 활용한 DB 구성 및 CRUD 샘플 액션]()과 동일한 DB를 사용할 경우, 상호보완 적인 테스트 및 확인 또한 가능합니다.
  1. 웹 액션을 활용하여 학생 정보를 생성(POST)하고
  2. `select-all-data 샘플 액션`을 이용하여 조회 진행
