# Cloud DB for Redis - 데이터 저장 샘플 액션
## 연동 서비스 및 시나리오
### Cloud DB for Redis(VPC)
+ Redis에 `단어(term)`와 `의미(definition)`을 저장하는 간단한 샘플 액션입니다.

+ Redis는 `Redis-Simple` 타입으로 생성하여 진행합니다.

+ Redis를 생성하면, `Cloud DB for Redis ACG`가 자동으로 생성되는데, 본 샘플 액션이 정상적으로 접근할 수 있도록 해당 ACG의 Inbound Rule를 하기와 같이 설정해주어야 합니다.
> <img width="422" alt="image" src="https://user-images.githubusercontent.com/104127073/169486821-3d3479c2-952e-4a4a-b067-768c6ba4bd6f.png">
  
+ [Cloud DB for Redis 가이드](https://guide.ncloud-docs.com/docs/database-database-8-5)

---
## 액션 Input Parameter
+ `redis_host` - 액션이 접근할 Redis Server 호스트 IP
  + [Redis Server 콘솔](https://console.ncloud.com/vpcCloudRedis/server)에서 서비스를 선택하여, DNS 값을 통해 확인할 수 있습니다.
+ `redis_port` - Redis Server Port 번호(default: 6379)
+ `term` - 저장하고자 하는 단어(ex. `CF`)
+ `definition` - 저장하고자 하는 단어의 의미(ex. `Cloud Functions of Naver Cloud`)

---
## 사용법
1. 사용하고자 하는 런타임(python:3.6 또는 python:3.7)과 동일한 버전의 python 가상 환경 *virtualenv*를 생성
2. python으로 Redis 서버 접근 및 작업을 위한 `redis` 라이브러리 설치 - **pip install redis**
3. `zip -r action.zip *`
4. [NCP Console](console.ncloud.com)에서 액션 생성 시 `action.zip` 파일 업로드하여 Action 생성

---
## 액션 실행 결과 확인
+ Cloud Functions 콘솔에서 액션을 직접 실행하거나, 외부 연결 주소, 트리거 등을 이용할 수도 있습니다.

+ [Cloud DB for Redis 가이드](https://guide.ncloud-docs.com/docs/database-database-8-5)를 참조하여 Redis에 접근 가능한 App 서버를 구성하고 접근하여, `get {액션 Input 중 term 값}` 명령어를 통해 간단히 확인할 수 있습니다.
> <img width="272" alt="image" src="https://user-images.githubusercontent.com/104127073/169490745-f953d87b-da88-4e2b-8f8c-37479ff8df29.png">
