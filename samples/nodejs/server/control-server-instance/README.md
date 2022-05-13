# Server Instance 시작/정지 샘플 액션
## 연동 상품
### Server
+ [Server 사용 가이드](https://guide.ncloud-docs.com/docs/compute-server-virtualmachineserver-overview-vpc)
+ [NCP API 사용 가이드(인증 헤더 생성)](https://api.ncloud-docs.com/docs/common-ncpapi)
+ [Server Instance Control API 가이드](https://api.ncloud-docs.com/docs/compute-vserver-server-startserverinstances)

---
## 액션 Input Parameter
+ `baseUrl` - API서버 인스터스 제어 API 가이드 참조 필요
+ `apiUrl` - 서버 인스턴스 제어 API 가이드 참조 필요
  + 서버 인스턴스 Id 목록인 `serverInstances`와 함께 엔드포인트 구성하여, 암호화 서명(singKey) 생성하는데 이용됩니다.
+ `accessKey` - NCP API 인증키 정보로, `[NCP포털](ncloud.com)- 마이페이지 - 인증키관리`에서 발급 및 확인 가능합니다.
+ `secretKey` - NCP API 인증키 정보로, `[NCP포털](ncloud.com)- 마이페이지 - 인증키관리`에서 발급 및 확인 가능합니다.
+ `serverInstances` - 시작/정지 대상인 서버 인스턴스 Id 목록(array `[ ]`)
  + API 엔드포인트의 파라미터 값을 구성합니다.

---
## 사용법
1. `npm install --production`
2. `zip -r action.zip *`
3. [NCP Console](console.ncloud.com)에서 액션 생성 시 `action.zip` 파일 업로드 후 실행

---
## 액션 실행 결과 확인
액션 실행 후 `serverInstances`에 지정한 시작/정지 대상 서버 인스턴스들의 `Server 서비스 콘솔 - 상태`를 통해서 간단히 확인 가능합니다.