# Cloud Functions
## Cloud Functions Sample
+ 네이버 클라우드 플랫폼(NCP)의 Cloud Functions 서비스를 활용할 수 있는 간단한 샘플 액션들입니다.

+ 다른 다양한 서비스들과 함께 Cloud Functions를 활용할 수 있는 여러 시나리오에 대해서, 샘플 액션들이 제공되고 있습니다.

+ 현재 NodeJS와 Python 두 가지 런타임 환경에 대해서 샘플 액션들이 제공되고 있으며, 추후 확대 예정입니다.
<br></br>

## Runtimes
+ [NodeJS](https://github.com/NaverCloudPlatform/cloud-functions/tree/master/samples/nodejs)
+ [Python](https://github.com/NaverCloudPlatform/cloud-functions/tree/master/samples/python)
<br></br>

## Sample Scenario
+ 제공되는 샘플들과, Cloud Functions와 연동되는 NCP 서비스 또는 외부 서비스(ex. Slack)은 다음과 같습니다.

+ 보다 상세한 내용과 가이드는 각 샘플 별 `README.md`를 통해서 확인하실 수 있습니다.

| 샘플 | 설명 | 연동 서비스 | 바로가기 |
|---|---|---|---|
| iot | Cloud IoT Core 데이터 보강 및 저장 샘플 액션 | [Cloud IoT Core](https://www.ncloud.com/product/iot/cloudIotCore)<br/>[Cloud DB for Redis](https://www.ncloud.com/product/database/cloudDbRedis)<br/>[Cloud DB for MongoDB](https://www.ncloud.com/product/database/cloudDbMongoDB) | [NodeJS](./nodejs/iot/index.js) <br/>[Python](./python/iot/__main__.py) |
| mongodb | MongoDB 데이터 저장 샘플 액션 | [Cloud DB for MongoDB](https://www.ncloud.com/product/database/cloudDbMongoDB) | [NodeJS](./nodejs/mongodb/index.js) <br/>[Python](./python/mongodb/__main__.py) |
| mysql | MySQL 데이터 CRUD 수행 샘플 액션 | [Cloud DB for MySQL](https://www.ncloud.com/product/database/cloudDbMysql) | [NodeJS](./nodejs/mysql/db-crud) <br/>[Python](./python/mysql/db-crud) |
| object-storage | 버킷/오브젝트 생성/조회/삭제 샘플 액션 | [Object Storage](https://www.ncloud.com/product/storage/objectStorage) | [NodeJS](./nodejs/object-storage) <br/>[Python](./python/object-storage) |
| redis | Redis 데이터 저장 샘플 액션 | [Cloud DB for Redis](https://www.ncloud.com/product/database/cloudDbRedis) | [NodeJS](./nodejs/redis/index.js) <br/>[Python](./python/redis/__main__.py) |
| rest-api | RestAPI BackEnd 구성 웹 액션 샘플 | [Cloud DB for MySQL](https://www.ncloud.com/product/database/cloudDbMysql) | [NodeJS](./nodejs/rest-api/index.js) <br/>[Python](./python/rest-api/__main__.py) |
| server | Server Instance 시작/정지 샘플 액션 | [Server](https://www.ncloud.com/product/compute/server) | [NodeJS](./nodejs/server/control-server-instance/index.js) <br/>[Python](./python/server/control-server-instance/__main__.py) |
| slack | Slack 알림 발송 샘플 액션 | [Slack](https://slack.com/intl/ko-kr/)(NCP 외부 서비스) | [NodeJS](./nodejs/slack/index.js) <br/>[Python](./python/slack/__main__.py) |

<br></br>
## 참고자료
+ [Cloud Functions 가이드](https://guide.ncloud-docs.com/docs/cloudfunctions-overview)에서 Cloud Functions 이용 방법 전반에 대한 설명과 [FAQ](https://guide.ncloud-docs.com/docs/docscloudfunctions-faq), [문제 해결](https://guide.ncloud-docs.com/docs/cloudfunctions-troubleshooting) 방법을 참조할 수 있습니다.