# Object Storage - 버킷 생성 / 목록 조회 / 삭제 샘플 액션
# 연동 서비스 및 시나리오
### Object Storage
+ Cloud Functions 콘솔에서 액션을 실행(invoke)하여 Object Storage 서비스의 `버킷`을 생성(create), 목록 조회(list), 삭제(delete)를 수행합니다.

+ [Object Storage Python SDK](https://guide.ncloud-docs.com/docs/storage-storage-8-2)를 바탕으로 작성되었습니다.

+ [Object Storage 사용 가이드](https://guide.ncloud-docs.com/docs/storage-storage-6-1)

---
## 액션 Input Parameter
### Object Storage 접근을 위한 공통 Input Parameter
+ `access_key` - NAVER Cloud Platform API 인증키 정보로, `[NAVER Cloud Platform](ncloud.com)- 마이페이지 - 인증키관리`에서 발급 및 확인 가능합니다.
+ `secret_key` - NAVER Cloud Platform API 인증키 정보로, `[NAVER Cloud Platform](ncloud.com)- 마이페이지 - 인증키관리`에서 발급 및 확인 가능합니다.

### 버킷 생성(create-bucket)
+ `bucket_name` - 생성할 버킷의 이름

### 버킷 목록 조회(list-bucket)
+ 공통 Input Parameter 외 추가 정보 요구되지 않습니다.

### 버킷 삭제(delete-bucket)
+ `bucket_name` - 생성할 버킷의 이름

---
## 사용법
1. 사용하고자 하는 런타임(python:3.6 또는 python:3.7)과 동일한 버전의 python 가상 환경 *virtualenv*를 생성
  + 파이썬 런타임에서 기본적으로 제공하는 reqeusts 라이브러리 외에 `boto3==1.6.19`를 [Cloud Functions Python 가이드](https://guide.ncloud-docs.com/docs/compute-compute-15-2-2)와 [Object Storage Python SDK](https://guide.ncloud-docs.com/docs/storage-storage-8-2)를 참조하여 설치하여야 합니다.
2. `zip -r action.zip *`
3. [NAVER Cloud Platform Console](console.ncloud.com)에서 액션 생성 시 `action.zip` 파일 업로드하여 Action 생성

---
## 액션 실행 결과 확인
+ Cloud Functions 콘솔에서 `생성-조회-삭제-조회`의 순서로 액션을 실행하면 버킷의 생성 및 삭제를 효율적으로 확인할 수 있습니다.

+ 또는 직접 Object Storage 콘솔의 Bucket Management 페이지에서 확인할 수 있습니다.