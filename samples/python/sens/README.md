# SENS를 활용한 SMS 전송 액션
## 연동 서비스 및 시나리오
### SENS (Simple & Eash Notification Service)
+ SENS API를 이용하여 손쉽게 SMS를 전송하는 액션입니다.

+ [SENS 사용 가이드](https://guide.ncloud-docs.com/docs/sens-overview)

+ [NAVER Cloud Platform API 사용 가이드(인증 헤더 생성)](https://api.ncloud-docs.com/docs/common-ncpapi)

+ [SENS - SMS API 가이드](https://api.ncloud-docs.com/docs/ai-application-service-sens-smsv2)

---
## 액션 Input Parameter
+ `base_url` - SENS SMS API 가이드 참조 필요
+ `api_url` - SENS SMS API 가이드 참조 필요
  + SENS 프로젝트의 service_id를 활용하여 구성됩니다. 
+ `access_key` - NAVER Cloud Platform API 인증키 정보로, `[NAVER Cloud Platform](ncloud.com)- 마이페이지 - 인증키관리`에서 발급 및 확인 가능합니다.
+ `secret_key` - NAVER Cloud Platform API 인증키 정보로, `[NAVER Cloud Platform](ncloud.com)- 마이페이지 - 인증키관리`에서 발급 및 확인 가능합니다.
+ `from_phone_number` - 메시지 발송자의 휴대폰 번호입니다. 정상적인 전송을 위해서 `SENS - SMS - Calling Number`에 사전 등록이 필요합니다.
+ `to_phone_number` - 메시지 수신자의 휴대폰 번호입니다.
+ `message_content` - 전송하고자 하는 SMS 메시지의 내용입니다.

---
## 사용
1. 사용하고자 하는 런타임(py법thon:3.6 또는 python:3.7)과 동일한 버전의 python 가상 환경 *virtualenv*를 생성
    + 본 샘플 액션에서 이용되는 라이브러리들은 파이썬 런타임에서 기본적으로 제공되고 있으므로 `.zip` 파일 업로드가 아니라, 코드만을 콘솔 에디터에 `복사-붙여넣기`하여 액션을 생성 및 실행할 수도 있습니다.
2. `zip -r action.zip *`
3. [NAVER Cloud Platform Console](console.ncloud.com)에서 액션 생성 시 `action.zip` 파일 업로드하여 Action 생성

---
## 액션 실행 결과 확인
실제 보유한 단말기의 번호를 `to_phone_nubmer`로 지정하여 액션 실행 후, SMS 수신 여부를 확인할 수 있습니다.