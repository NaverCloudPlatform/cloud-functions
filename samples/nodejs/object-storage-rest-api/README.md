# Object Storage - RestAPI Backend 구성 웹 액션 샘플
## 연동 서비스 및 시나리오
### Object Storage
+ HTTP Rest API를 활용하여, Object Storage의 어떤 버킷에 오브젝트를 추가(갱신)하거나, 조회, 삭제가 가능하도록 구성합니다.

+ 액션에서 Request 정보를 활용할 수 있도록 `Cloud Functions 웹 액션`을 이용합니다.

+ 웹 액션의 외부 연결 주소는 `{invokeUrl}/{type+}`의 형태이며, 본 샘플 액션 시나리오에서 `type+`으로 `http`를 활용합니다.

+ 웹 액션을 생성할 때, 콘솔에서 `웹 액션 설정`과 `HTTP 원문 사용` 옵션을 True로 하여야 합니다.
  + `HTTP 원문 사용`이 True일 때만 액션으로 전달되는 파라미터 중 `__ow_body`와 `__ow_query`를 참조할 수 있습니다.  

+ [Object Storage 사용 가이드](https://guide.ncloud-docs.com/docs/storage-storage-8-4)의 JavaScript SDK를 바탕으로 작성되었습니다.

---
## 액션 Input Prameter
### Object Storage 접근을 위한 공통 Input Parameter
+ `accessKey` - NCP API 인증키 정보로, `[NCP포털](ncloud.com)- 마이페이지 - 인증키관리`에서 발급 및 확인 가능합니다.
+ `secretKey` - NCP API 인증키 정보로, `[NCP포털](ncloud.com)- 마이페이지 - 인증키관리`에서 발급 및 확인 가능합니다.
+ `bucketName` - 오브젝트 조회, 추가, 삭제의 대상이 되는 버킷 이름

### RestAPI 메소드에 따라서 요구되는 Input Parameter
+ 각 API 개발을 위해 필요한 Parameter는, Request Body를 통해 액션의 `main`으로 전달됩니다.
+ 각 메소드에 따라서 Request Body 필요 여부, 구성 등이 달라지며 예시는 다음과 같습니다.

    ```
    * POST  /objects
        - 버킷에 오브젝트를 업로드
        - body 예시(name과 content 필드 필요)
        {
            "name": "myObject",
            "content": "hello world"
        }

    * GET  /objects/{object-name}
        - url path를 통해 요청된 오브젝트(object-name)를 버킷으로 부터 조회

    * DELETE  /objects/{object-name}
        - url path를 통해 요청된 오브젝트(object-name)를 버킷으로 부터 삭제
    ```
  
---
## 사용법
1. `npm install --production`
2. `zip -r action.zip *`
3. [NCP Console](console.ncloud.com)에서 액션 생성 시 `action.zip` 파일 업로드
4. 상기 `액션 Input Parameter`를 참고하여, 브라우저나 [Postman](https://www.postman.com)과 같은 도구를 활용하여 웹 액션을 호출할 수 있습니다.

---
## 액션 실행 결과 확인
+ 본 샘플 액션은 모든 경우의 에러 처리를 하고 있지 않으며, HTTP Status Code 또한 다소 간략히 표현되고 있습니다.

+ 웹 액션을 호출하고 응답 값을 통해 오브젝트를 조회하거나, 생성/삭제된 오브젝트의 현황은 [Object Storage 콘솔](https://console.ncloud.com/objectStorage/objectStorageList)에서 확인할 수 있습니다.