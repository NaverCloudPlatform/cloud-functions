# Server Instance 시작/정지 샘플 액션
## 연동 서비스
### Server

+ Server API를 이용하여 서버 인스턴스를 시작 또는 정지하는 샘플 액션입니다.

+ 200 OK 외의 Http Status Code를 응답 받거나, Http 통신 에러가 발생한 경우에는 `raise Exception`을 통해 에러 로그를 반환하고, 액션을 실패한 것으로 간주합니다.

+ [Server 사용 가이드](https://guide.ncloud-docs.com/docs/compute-server-virtualmachineserver-overview-vpc)

+ [NAVER Cloud Platform API 사용 가이드(인증 헤더 생성)](https://api.ncloud-docs.com/docs/common-ncpapi)

+ [Server Instance Control API 가이드](https://api.ncloud-docs.com/docs/compute-vserver-server-startserverinstances)

---
## 액션 Input Parameter
+ `base_url` - 서버 인스턴스 제어 API 가이드 참조 필요
+ `api_url` -  서버 인스턴스 제어 API 가이드 참조 필요
  + 서버 인스턴스 Id 목록인 `serverInstances`와 함께 엔드포인트 구성하여, 암호화 서명(singKey) 생성하는데 이용됩니다.
+ `access_key` - NAVER Cloud Platform API 인증키 정보로, `[NAVER Cloud Platform](ncloud.com)- 마이페이지 - 인증키관리`에서 발급 및 확인 가능합니다.
+ `secret_key` - NAVER Cloud Platform API 인증키 정보로, `[NAVER Cloud Platform](ncloud.com)- 마이페이지 - 인증키관리`에서 발급 및 확인 가능합니다.
+ `server_instances` - 시작/정지 대상인 서버 인스턴스 Id 목록(`ex. server_instances: [11111111, 22222222]`)
  + API 엔드포인트의 파라미터 값을 구성합니다.

---
## 사용법
1. 사용하고자 하는 런타임(python:3.13)과 동일한 버전의 python 가상 환경 *virtualenv*를 생성
   + 본 샘플 액션에서 이용되는 라이브러리들은 파이썬 런타임에서 기본적으로 제공되고 있으므로 `.zip` 파일 업로드가 아니라, 코드만을 콘솔 에디터에 `복사-붙여넣기`하여 액션을 생성 및 실행할 수도 있습니다.
2. `zip -r action.zip *`
3. [NAVER Cloud Platform Console](console.ncloud.com)에서 액션 생성 시 `action.zip` 파일 업로드하여 Action 생성

---
## 액션 실행 결과 확인
액션 실행 후 `server_instances`에 지정한 시작/정지 대상 서버 인스턴스들의 `Server 서비스 콘솔 - 상태`를 통해서 간단히 확인 가능합니다.