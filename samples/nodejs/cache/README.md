# Cloud DB for Cache - 데이터 저장 샘플 액션
## 연동 서비스 및 시나리오
### Cloud DB for Cache(VPC)
+ Redis에 `단어(term)`와 `의미(definition)`을 저장하는 간단한 샘플 액션입니다.

+ Redis를 생성하면, `Cloud DB for Cache ACG`가 자동으로 생성되는데, 본 샘플 액션이 정상적으로 접근할 수 있도록 해당 ACG의 Inbound Rule를 하기와 같이 설정해주어야 합니다.
> <img width="422" alt="image" src="https://user-images.githubusercontent.com/104127073/169486821-3d3479c2-952e-4a4a-b067-768c6ba4bd6f.png">
  
+ [Cloud DB for Cache 가이드](https://guide.ncloud-docs.com/docs/database-database-8-5)

---
## 액션 Input Parameter
+ `redisUrl` - 액션이 접근할 Redis Server 호스트 IP
  + [Redis Server 콘솔](https://console.ncloud.com/vpcCloudCache/server)에서 서비스를 선택하여, DNS 값을 통해 확인할 수 있습니다.
  + 상기의 DNS 값(문자열) 앞에 `redis://`를 추가하고 `Port 번호(default: 6379)`를 포함하여야 정상적인 접근이 가능하며, 자세한 내용은 [redis/node-redis GIT](https://github.com/redis/node-redis)을 참조하시길 바랍니다. 
+ `term` - 저장하고자 하는 단어(ex. `CF`)
+ `definition` - 저장하고자 하는 단어의 의미(ex. `Cloud Functions of Naver Cloud`)

---
## 사용법
1. `npm install --production`
  + `redis 패키지` 버전 4.0.6을 기준으로 작성하였으며, 다른 버전을 이용할 경우 에러가 발생할 수 있습니다. 
  + 자세한 내용은 [redis/node-redis GIT](https://github.com/redis/node-redis)을 참조하시길 바랍니다. 
2. `zip -r action.zip *`
3. [NAVER Cloud Platform Console](console.ncloud.com)에서 액션 생성 시 `action.zip` 파일 업로드
4. 액션 생성 시 **nodejs:22** 런타임을 선택하여야 *redis* 패키지를 정상 이용할 수 있습니다.

---
## 액션 실행 결과 확인
+ Cloud Functions 콘솔에서 액션을 직접 실행하거나, 외부 연결 주소, 트리거 등을 이용할 수도 있습니다.

+ [Cloud DB for Cache 가이드](https://guide.ncloud-docs.com/docs/database-database-8-5)를 참조하여 Redis에 접근 가능한 App 서버를 구성하고 접근하여, `get {액션 Input 중 term 값}` 명령어를 통해 간단히 확인할 수 있습니다.
> <img width="272" alt="image" src="https://user-images.githubusercontent.com/104127073/169490745-f953d87b-da88-4e2b-8f8c-37479ff8df29.png">
