# Cloud IoT Core - 데이터 보강 및 저장 샘플 액션(Cloud DB for Redis, MongoDB 활용)
## 연동 서비스 및 시나리오
### Cloud IoT Core, Cloud DB for Redis(VPC), Cloud DB for MongoDB(VPC)
+ Cloud IoT Core에서 메시지가 발행되면 Cloud Functions IoT Trigger와 연결된 액션이 실행되어, Cloud IoT Core로 부터 전달된 데이터 중 `deviceId`를 바탕으로 Redis에서 기기 정보를 조회 및 추가하여 MongoDB에 `기기 정보 + Cloud IoT Core에서 발행된 메시지`를 저장합니다.

+ 본 샘플 코드에서 사용되는, Cloud Iot Core를 통해서 발행되는 메시지의 형태는 다음과 같습니다.
```json
{
    "deviceId": "3",
    "deviceType": "temperature", 
    "temp": 55,
    "battery": 7, 
    "date": "2016-12-15", 
    "time": "15:12:00"
}
```
+ 상기의 예시 메시지에서 `deviceId`를 이용하여, Redis에서 조회하게 되는 기기 정보(`deviceInfo`) 예시는 다음과 같으며, 사전에 Redis 서버에 아래와 같이 데이터를 저장해두어야 합니다.
```json
{
    "dateOfManufactoring": "11/27/2005",    
    "dateOfRegistration": "9/25/2019",      
    "manager": "Yoon, M.S."                 
}
```

+ 실제 IoT 디바이스 없이 로컬에서 메시지를 발행하는 테스트를 진행하는 방법과 샘플 코드, Iot Rule 설정, 토픽 지정 등은 [Cloud IoT Core 가이드](https://guide.ncloud-docs.com/docs/cloudiotcore-cloudiotcoreconsole)와 [Cloud Functions IoT 트리거 가이드](https://guide.ncloud-docs.com/docs/cloudfunctions-cloudiotcore-vpc)를 참조하시길 바랍니다.

+ 기기 정보(`device_info`)를 조회하고, 보강 및 저장하는 과정에서 Cloud DB for Redis와 Cloud DB for MongoDB가 이용되는데, 이와 관련된 설정 또는 사용 방법은 다음의 샘플 코드 및 문서들을 참조하시길 바랍니다.
  + [Cloud DB for Redis - 데이터 저장 샘플 액션](https://github.com/NaverCloudPlatform/cloud-functions/tree/master/samples/nodejs/redis)
  + [Cloud DB for MongoDB - 데이터 저장 샘플 액션](https://github.com/NaverCloudPlatform/cloud-functions/tree/master/samples/nodejs/mongodb)
  + [Cloud DB for Redis 가이드](https://guide.ncloud-docs.com/docs/database-database-8-5)
  + [Cloud DB for MongoDB 가이드](https://guide.ncloud-docs.com/docs/clouddbformongodb-overview)

---
## 액션 Input Parameter
### Cloud IoT Trigger로 부터 전달되는 Parameter
+ `deviceId` - Redis 서버에서 기기 정보를 조회할 때 이용되는 기기 식별자
  + `deviceId`를 제외한 하기 데이터들은, MongoDB에 저장을 위한 Dummy Data이며 액션의 로직에 중요한 영향을 끼치지 않습니다.
+ `deviceType` - 기기 타입
+ `temp` - 측정 온도
+ `battery` - 기기 배터리 잔량
+ `date` - 데이터 생성 날짜
+ `time` - 데이터 생성 시간


### Redis, MongoDB 접속 정보 Paramter
+ `access_info`
  + `redis_host` - 액션이 접근할 Redis Server IP 또는 Host name
    + [Redis Server 콘솔](https://console.ncloud.com/vpcCloudRedis/server)에서 서비스를 선택하여, DNS 값을 통해 확인할 수 있습니다.
  + `redis_port` - Redis Server Port 번호(default: 6379)
  + `mongo_url` - MongoDB 접속을 위한 Private Domain
    - MongoDB 콘솔에서 확인 가능합니다.
    - `MongoDB 콘솔` - `DB 관리` - `DB User 관리`를 통해서 클러스터 내 DB 별 계정 정보 관리가 가능하며, 이를 이용하여 Url을 구성하게 됩니다.
  + `mongo_db_name` - MongoDB 클러스터에서 사용할 DB 이름 정보
  + `mongo_col_name` - 실제 데이터를 저장할 콜렉션(collection) 이름 정보
<br></br>
+ access_info 예시
```json
{
    "access_info": {
        "mongo_col_name": "iotdatas",
        "mongo_db_name": "iot_data",
        "mongo_url": {URL to access MongoDB},
        "redis_host": {host name to access Redis},
        "redis_port": 6379,
    }
}
```

---
## 사용법
1. 사용하고자 하는 런타임(python:3.6 또는 python:3.7)과 동일한 버전의 python 가상 환경 *virtualenv*를 생성
2. python으로 Redis, MongoDB 서버 접근 및 작업을 위한 `redis`, `pymongo` 라이브러리 설치 - **pip install redis pymongo**, 
3. `zip -r action.zip *`
4. [NAVER Cloud Platform Console](console.ncloud.com)에서 액션 생성 시 `action.zip` 파일 업로드하여 Action 생성
5. Cloud Functions IoT 트리거를 생성 및 액션과 연결합니다.

---
## 액션 실행 결과 확인
+ [Cloud IoT Core 가이드](https://guide.ncloud-docs.com/docs/cloudiotcore-overview)를 참조하여 준비 및 작성한, 메시지 발행 샘플 코드를 실행합니다.

+ 발행된 메시지는 지정된 토픽으로 전달되고, 이어서 Cloud Functions IoT 트리거를 거쳐서 액션으로 전달되게 됩니다.

+ 전달된 데이터를 바탕으로 Redis를 조회 및 데이터 보강 후 MongoDB에 저장되기 때문에, MongoDB에 접근 가능하도록 설정된 App 서버를 통해 다음과 같이 확인 가능합니다.
> <img width="514" alt="image" src="https://user-images.githubusercontent.com/104127073/170290773-f3e864a3-ac3b-4e7e-bbda-a75712f6f2d0.png">