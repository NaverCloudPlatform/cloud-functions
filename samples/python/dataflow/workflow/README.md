# Data Flow - 워크플로 실행 샘플 액션
## 연동 서비스 및 시나리오
### Data Flow
+ Object Storage 버킷에 파일이 업로드되면, Cloud Functions 액션이 Data Flow 워크플로 실행 API를 호출하여 워크플로를 실행합니다.

  ```
  Object Storage (ObjectCreated:PUT)
    → Cloud Functions 트리거(Object Storage)
      → 본 샘플 액션
        → POST https://dataflow.apigw.ntruss.com/api/v1/workflows/{workflowId}/executions
          → Data Flow 워크플로 실행
  ```

+ Data Flow 콘솔에서 **실행 유형 = 이벤트**, **이벤트 소스 = Cloud Functions**로 트리거를 생성하고 워크플로에 연결하면, 트리거 상세의 **실행 가이드**에서 실행 API 경로와 본 샘플 코드를 확인할 수 있습니다.

+ 호출은 NAVER Cloud Platform API 인증(`x-ncp-apigw-signature-v2`)을 사용하며, 요청 본문은 비어 있습니다. 호출 출처(액션 이름, activation ID)만 `x-ncp-dataflow-payload` 헤더에 Base64 JSON으로 담아 전달합니다.

+ Object Storage 트리거는 예시일 뿐이며, Cloud Functions가 지원하는 다른 트리거(Cron, API Gateway 등)에 연결해도 동작합니다.

+ [Data Flow 사용 가이드 - Trigger](https://guide.ncloud-docs.com/docs/dataflow-trigger-vpc)

+ [Data Flow API 가이드](https://api.ncloud-docs.com/docs/analytics-dataflow)

+ [Cloud Functions Object Storage 트리거 가이드](https://guide.ncloud-docs.com/docs/cloudfunctions-objectstorage-vpc)

---
## 액션 Input Parameter
### Data Flow API 호출을 위한 공통 Input Parameter (액션 기본 파라미터로 등록)
+ `NCLOUD_ACCESS_KEY` - NAVER Cloud Platform API 인증키 정보로, `[NAVER Cloud Platform](ncloud.com) - 마이페이지 - 인증키관리`에서 발급 및 확인 가능합니다.
+ `NCLOUD_SECRET_KEY` - NAVER Cloud Platform API 인증키 정보로, `[NAVER Cloud Platform](ncloud.com) - 마이페이지 - 인증키관리`에서 발급 및 확인 가능합니다.
+ `DATAFLOW_WORKFLOW_ID` - 실행할 Data Flow 워크플로 ID. Data Flow 콘솔 > Trigger > 트리거 상세 > **연결된 워크플로**에서 복사할 수 있습니다.

### 워크플로 실행(execute-workflow)
+ 추가 Input Parameter 없음. `DATAFLOW_WORKFLOW_ID`에 지정한 워크플로를 실행합니다.
+ Object Storage 트리거가 전달하는 이벤트 본문(버킷 이름, 오브젝트 키 등)은 본 샘플에서 사용하지 않습니다. 워크플로 실행에 이벤트 데이터가 필요하면 `payload`에 추가하여 확장할 수 있습니다.

---
## 사용법
1. Data Flow 콘솔에서 실행 유형이 **이벤트**인 트리거를 생성하고, 실행할 워크플로에 연결합니다.
2. Cloud Functions 콘솔에서 Python 런타임(python:3.13)으로 액션을 생성하고 `execute-workflow/__main__.py` 내용을 소스 코드에 붙여 넣습니다.
   + 파이썬 런타임에서 기본 제공하는 `requests` 라이브러리만 사용하므로 별도 패키징(zip)이 필요하지 않습니다.
   + Data Flow API 호스트(`API_HOST`)는 소스 상단 상수로 고정되어 있습니다. 다른 환경으로 보내야 하면 이 값을 수정합니다.
3. 액션 **기본 파라미터**에 `NCLOUD_ACCESS_KEY`, `NCLOUD_SECRET_KEY`, `DATAFLOW_WORKFLOW_ID`를 등록합니다.
4. Cloud Functions 콘솔에서 Object Storage 트리거를 생성하고(이벤트 타입 `ObjectCreated:PUT`, 대상 버킷 지정), 본 액션에 연결합니다.
5. 지정한 버킷에 파일을 업로드하면 액션이 실행되어 Data Flow 워크플로 실행이 요청됩니다.

---
## 액션 실행 결과 확인
+ 액션이 성공하면 실행 결과에 `statusCode: 202`와 Data Flow가 반환한 실행 정보(`body`)가 표시됩니다.

+ Data Flow 콘솔 > Workflow > 해당 워크플로의 실행 이력에서 실행이 시작되었는지 확인할 수 있습니다.

+ 액션이 실패하면 `DataFlow workflow execution failed: status=..., workflowId=..., <서버가 준 사유>` 형식의 예외가 발생합니다.
  + `status=404`이고 사유에 `errorType`이 포함되어 있으면 대부분 `DATAFLOW_WORKFLOW_ID`가 잘못된 경우입니다. 연결된 워크플로 ID를 다시 확인하십시오.
  + 사유가 `rejected before reaching DataFlow: ...`로 시작하면 API Gateway 단계에서 거절된 것입니다. 인증키와 시그니처(시스템 시간)를 확인하십시오.
