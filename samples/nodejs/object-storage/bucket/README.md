# Object Storage - 버킷 생성 / 목록 조회 / 삭제 샘플 액션
## 연동 서비스 및 시나리오
### Object Storage
+ Cloud Functions 콘솔에서 액션을 실행(invoke)하여 Object Storage 서비스의 `버킷`을 생성(create), 목록 조회(list), 삭제(delete)를 수행합니다.

+ [Object Storage 사용 가이드](https://guide.ncloud-docs.com/docs/storage-storage-8-4)의 JavaScript SDK를 바탕으로 작성되었고, 이는 async/await을 활용한 예제를 제공하고 있지만, 본 샘플 액션은 [Cloud Functions 액션 NodeJS 패키징 가이드](https://guide.ncloud-docs.com/docs/compute-compute-15-2-1#%EC%95%A1%EC%85%98%EC%9D%84-nodejs-%EB%AA%A8%EB%93%88%EB%A1%9C-%ED%8C%A8%ED%82%A4%EC%A7%95%ED%95%98%EA%B8%B0)를 바탕으로, Promise를 이용하여 작성되었습니다.

+ `async/await`를 활용한 구현 또한 가능하므로, 익숙한 방법으로 자유롭게 액션을 생성 및 활용 가능합니다.

+ [Object Storage 사용 가이드](https://guide.ncloud-docs.com/docs/storage-storage-8-4)

---
## 액션 Input Parameter
### Object Storage 접근을 위한 공통 Input Parameter
+ `accessKey` - NAVER Cloud Platform API 인증키 정보로, `[NAVER Cloud Platform](ncloud.com)- 마이페이지 - 인증키관리`에서 발급 및 확인 가능합니다.
+ `secretKey` - NAVER Cloud Platform API 인증키 정보로, `[NAVER Cloud Platform](ncloud.com)- 마이페이지 - 인증키관리`에서 발급 및 확인 가능합니다.

### 버킷 생성(create-bucket)
+ `bucketName` - 생성할 버킷의 이름

### 버킷 목록 조회(list-bucket)
+ 공통 Input Parameter 외 추가 정보 요구되지 않습니다.

### 버킷 삭제(delete-bucket)
+ `bucketName` - 생성할 버킷의 이름

---
## 사용법
1. `npm install --production`
2. `zip -r action.zip *`
3. [NAVER Cloud Platform Console](console.ncloud.com)에서 액션 생성 시 `action.zip` 파일 업로드
4. 버킷의 생성 또는 삭제 액션을 실행할 경우, 대상이 되는 버킷의 이름(bucketName)을 입력하여 실행합니다.

---
## 액션 실행 결과 확인
+ Cloud Functions 콘솔에서 `생성-조회-삭제-조회`의 순서로 액션을 실행하면 버킷의 생성 및 삭제를 효율적으로 확인할 수 있습니다.

+ 또는 직접 Object Storage 콘솔의 Bucket Management 페이지에서 확인할 수 있습니다.