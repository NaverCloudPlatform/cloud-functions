# Slack 알림 발송 샘플 액션
## 연동 서비스 및 시나리오
### Slack
+ Cloud Functions의 GitHub Trigger를 이용하여, 특정 repository에 commit 이력 발생한 경우, 해당 정보를 Slack 특정 채널로 전송
+ [Slack Incoming Webhook](https://api.slack.com/messaging/webhooks#posting_with_webhooks) - Slack 채널에 대한 수신 Web Hook Url 생성 필요
+ [Cloud Functions GitHub Trigger 가이드](https://guide.ncloud-docs.com/docs/compute-compute-15-2-1#%EB%B9%84%EB%8F%99%EA%B8%B0asynchronous-%EC%95%A1%EC%85%98-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0)

---
## 액션 Input Parameter
+ `slackUrl` - Slack 특정 채널의 수신용 Web Hook Url

---
### 사용법
1. `npm install --production`
2. `zip -r action.zip *`
3. [NAVER Cloud Platform Console](console.ncloud.com)에서 액션 생성 시 `action.zip` 파일 업로드 후 실행
4. GitHub Trigger 생성 - 개인 git repository와 personal access token 필요
5. action과 trigger 연결

---
## 액션 실행 결과 확인
GitHub Trigger 생성시 지정한 repository에 commit 진행 후, Slack 채널로 다음과 같이 알림이 오는 것을 확인하실 수 있습니다.

> <img width="464" alt="image" src="https://user-images.githubusercontent.com/104127073/165922147-3fc94222-84f1-4865-b343-82b65ad21a4d.png">