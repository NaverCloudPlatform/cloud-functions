# Object Storage - 버킷 생성 / 목록 조회 / 삭제 샘플 액션
# 연동 서비스 및 시나리오
### Object Storage
+ Cloud Functions 콘솔에서 액션을 실행(invoke)하여 Object Storage 서비스의 `특정 버킷 내 오브젝트`를 생성(upload), 목록 조회(list), 삭제(delete)를 수행합니다.

+ [Object Storage Python SDK](https://guide.ncloud-docs.com/docs/storage-storage-8-2)를 바탕으로 작성되었습니다.

+ [Object Storage 사용 가이드](https://guide.ncloud-docs.com/docs/storage-storage-6-1)

---
## 액션 Input Parameter
### Object Storage 접근을 위한 공통 Input Parameter
+ `access_key` - NCP API 인증키 정보로, `[NCP포털](ncloud.com)- 마이페이지 - 인증키관리`에서 발급 및 확인 가능합니다.
+ `secret_key` - NCP API 인증키 정보로, `[NCP포털](ncloud.com)- 마이페이지 - 인증키관리`에서 발급 및 확인 가능합니다.

### 오브젝트 생성(upload-object)
+ `bucket_name` - 오브젝트(본 샘플에서는 `ncp_image.jpeg`라는 이미지 파일을 활용합니다.)를 업로드할 버킷의 이름
+ `object_name` - 버킷에 업로드 및 표시될 오브젝트 이름
  + 예를들어, 로컬에서 `ncp_image.jpeg`라는 이미지 파일을, `img-of-ncp.jpeg`라는 이름의 오브젝트로 업로드 할 수 있습니다.
  + S3의 put_object, upload_file, delete_object 등의 API의 `Key` 옵션으로 이용되어, 생성 또는 삭제 대상 오브젝트를 지정하는 역할을 합니다.

### 오브젝트 목록 조회(list-object)
+ `bucket_name` - 오브젝트 목록을 조회할 대상이 되는 버킷 이름

### 오브젝트 삭제(delete-object)
+ `bucket_name` - 삭제하고자 하는 오브젝트가 위치한 버킷의 이름
+ `object_name` - 버킷에서 삭제하고자는 오브젝트의 이름

---
## 사용법
1. 사용하고자 하는 런타임(python:3.6 또는 python:3.7)과 동일한 버전의 python 가상 환경 *virtualenv*를 생성
  + 파이썬 런타임에서 기본적으로 제공하는 reqeusts 라이브러리 외에 `boto3==1.6.19`를 [Cloud Functions Python 가이드](https://guide.ncloud-docs.com/docs/compute-compute-15-2-2)와 [Object Storage Python SDK](https://guide.ncloud-docs.com/docs/storage-storage-8-2)를 참조하여 설치하여야 합니다.
2. `zip -r action.zip *`
3. [NCP Console](console.ncloud.com)에서 액션 생성 시 `action.zip` 파일 업로드하여 Action 생성

---
## 액션 실행 결과 확인
+ Cloud Functions 콘솔에서 `생성-조회-삭제-조회`의 순서로 액션을 실행하면 버킷의 생성 및 삭제를 효율적으로 확인할 수 있습니다.

+ 또는 직접 Object Storage 콘솔의 Bucket Management 페이지에서 확인할 수 있습니다.