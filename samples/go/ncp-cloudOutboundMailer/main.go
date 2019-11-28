package main

import (
	"bytes"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"time"
)

type Recipient struct {
	Address string `json:"address"`
	Name string `json:"name,omitempty"`
	Type string `json:"type"`
	Parameters interface{} `json:"parameters,omitempty"`
}

type SendMailResource struct {
	SenderAddress string `json:"senderAddress"`
	SenderName string `json:"senderName,omitempty"`
	TemplateSid int `json:"templateSid,omitempty"`
	Title string `json:"title"`
	Body string `json:"body"`
	Parameters interface{} `json:"parameters,omitempty"`
	Recipients []Recipient `json:"recipients"`
}

type Response struct {
	ID string `json:"requestId"`
	Count int `json:"count"`
}

func Main(obj map[string]interface{}) map[string]interface{} {
	accessKey := "{access_key}" // access key id (from portal or sub account)
	secretKey := "{secret_key}" // secret key (from portal or sub account)
	timestamp := strconv.Itoa(int(time.Now().UnixNano() / int64(time.Millisecond)))
	sigStr := fmt.Sprintf("%s\n%s\n%s", "POST /api/v1/mails", timestamp, accessKey)
	h := hmac.New(sha256.New, []byte(secretKey))
	h.Write([]byte(sigStr))
	signature := base64.StdEncoding.EncodeToString(h.Sum(nil))

	msg := SendMailResource{
		SenderAddress: "{sender}",
		SenderName: "{sender_name}",
		Title: "{title}",
		Body: "{contents}",
		Recipients: []Recipient{
			{
				Address: "{receiver}",
				Name: "{receiver_name}",
				Type: "R",
			},
		},
	}
	payload, err := json.Marshal(msg)
	if err != nil {
		//error handling
	}
	req, err := http.NewRequest("POST", "https://mail.apigw.ntruss.com/api/v1/mails", bytes.NewBuffer(payload))
	if err != nil {
		//error handling
	}
	req.Header.Add("Content-Type", "application/json; charset=utf-8")
	req.Header.Add("x-ncp-apigw-timestamp", timestamp)
	req.Header.Add("x-ncp-iam-access-key", accessKey)
	req.Header.Add("x-ncp-apigw-signature-v2", signature)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		//error handling
	}
	defer resp.Body.Close()
	respBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		//error handling
	}

	var res Response
	err = json.Unmarshal(respBody, &res)
	if err != nil {
		//error handling
	}
	return map[string]interface{}{"payload": res.ID}
}
