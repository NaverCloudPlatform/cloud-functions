# Server Instance 시작/정지 샘플 액션
## 연동 상품
Server(VPC)
+ [상품 소개](https://www.ncloud.com/product/compute/server)
+ [상품 가이드](https://guide.ncloud-docs.com/docs/compute-server-virtualmachineserver-overview-vpc)
+ [NCP API 사용 가이드(인증 헤더 생성)](https://api.ncloud-docs.com/docs/common-ncpapi)
+ [Server Instance Control API 가이드](https://api.ncloud-docs.com/docs/compute-vserver-server-startserverinstances)

---
## 액션 Input Parameter
+ `baseUrl` - 서버 인스터스 제어 API 가이드 참조 필요
+ `apiUrl` - 서버 인스턴스 제어 API 가이드 참조 필요
+ `accessKey` - NCP API 인증키 정보
+ `secretKey` - NCP API 인증키 정보
+ `serverInstances` - 시작/정지 대상인 서버 인스턴스 Id 목록(array). API 엔드포인트의 파라미터 값으로 이용됨.

---
## 사용법
1. `npm install --production`
2. `zip -r action.zip *`
3. [NCP Console](console.ncloud.com)에서 액션 생성 시 `action.zip` 파일 업로드 후 실행

---
## 액션 실행 결과 확인
액션 실행 후 `serverInstances`에 지정한 시작/정지 대상 서버 인스턴스들의 `Server 서비스 콘솔 - 상태`를 통해서 간단히 확인 가능