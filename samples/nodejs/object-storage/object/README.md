# Object Storage - 오브젝트 생성 / 목록 조회 / 삭제 샘플 액션
## 연동 서비스 및 시나리오
### Object Storage
+ Cloud Functions 콘솔에서 액션을 실행(invoke)하여 Object Storage 서비스의 `특정 버킷 내 오브젝트`를 생성(upload), 목록 조회(list), 삭제(delete)를 수행합니다.

+ [Object Storage 사용 가이드](https://guide.ncloud-docs.com/docs/storage-storage-8-4)의 JavaScript SDK를 바탕으로 작성되었고, 이는 async/await을 활용한 예제를 제공하고 있지만, 본 샘플 액션은 [Cloud Functions 액션 NodeJS 패키징 가이드](https://guide.ncloud-docs.com/docs/compute-compute-15-2-1#%EC%95%A1%EC%85%98%EC%9D%84-nodejs-%EB%AA%A8%EB%93%88%EB%A1%9C-%ED%8C%A8%ED%82%A4%EC%A7%95%ED%95%98%EA%B8%B0)를 바탕으로, Promise를 이용하여 작성되었습니다.

+ 단, 오브젝트 목록 조회(list-object)의 경우, 다량의 오브젝트가 존재할 때 해당 목록을 가져오는 Loop에 대한 원활한 처리를 위해, `async/await`를 활용하여 액션을 작성하였습니다.

---
## 액션 Input Parameter
### Object Storage 접근을 위한 공통 Input Parameter
+ `accessKey` - NCP API 인증키 정보로, `[NCP포털](ncloud.com)- 마이페이지 - 인증키관리`에서 발급 및 확인 가능합니다.
+ `secretKey` - NCP API 인증키 정보로, `[NCP포털](ncloud.com)- 마이페이지 - 인증키관리`에서 발급 및 확인 가능합니다.

### 오브젝트 생성(upload-object)
+ `bucketName` - 오브젝트(본 샘플에서는 `ncp_image.jpeg`라는 이미지 파일을 활용합니다.)를 업로드할 버킷의 이름
+ `objectName` - 버킷에 업로드 및 표시될 오브젝트 이름
  + 예를들어, 로컬에서 `ncp_image.jpeg`라는 이미지 파일을, `img-of-ncp.jpeg`라는 이름의 오브젝트로 업로드 할 수 있습니다.
  + S3의 putObject, deleteObject 등의 API의 `Key` 옵션으로 이용되어, 생성 또는 삭제 대상 오브젝트를 지정하는 역할을 합니다.

### 오브젝트 목록 조회(list-object)
+ `bucketName` - 오브젝트 목록을 조회할 대상이 되는 버킷 이름

### 오브젝트 삭제(delete-object)
+ `bucketName` - 삭제하고자 하는 오브젝트가 위치한 버킷의 이름
+ `objectName` - 버킷에서 삭제하고자는 오브젝트의 이름

---
## 사용법
1. `npm install --production`
2. `zip -r action.zip *` - 오브젝트 생성 액션(create-object)의 경우 업로드려는 이미지(`ncp_image.jpeg`)도 함께 압축을 진행합니다.
3. [NCP Console](console.ncloud.com)에서 액션 생성 시 `action.zip` 파일 업로드

---
## 액션 실행 결과 확인
+ Cloud Functions 콘솔에서 `생성-조회-삭제-조회`의 순서로 액션을 실행하면 오브젝트의 생성 및 삭제를 효율적으로 확인할 수 있습니다.

+ 또는 직접 Object Storage 콘솔의 Bucket Management 페이지에서 확인할 수 있습니다.