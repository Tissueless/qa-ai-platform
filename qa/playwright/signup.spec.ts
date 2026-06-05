
import { test, expect } from "@playwright/test";

const selectors = {
  "email": "#email",
  "password": "#password",
  "phone": "#phone",
  "submit": "[data-testid='submit']"
};


test("이메일 필수 테스트", async ({ page }) => {

});


test("비밀번호 최소 8자 이상 테스트", async ({ page }) => {
// unknown action: {"description":"회원가입 폼을 클릭합니다.","inputData":{"email":"test@example.com","password":"shortpass"}}
// unknown action: {"description":"비밀번호 입력란에 'shortpass'를 입력하고, 비밀번호 확인란에도 동일한 값을 입력합니다.","inputData":{"confirmPassword":"shortpass"}}
});


test("비밀번호 최소 8자 이상 테스트 (2)", async ({ page }) => {
// unknown action: {"description":"회원가입 폼을 클릭합니다.","inputData":{"email":"test@example.com","password":"longpass"}}
// unknown action: {"description":"비밀번호 입력란에 'longpass'를 입력하고, 비밀번호 확인란에도 동일한 값을 입력합니다.","inputData":{"confirmPassword":"longpass"}}
});


test("전화번호 인증 필요 테스트", async ({ page }) => {
// unknown action: {"description":"회원가입 폼을 클릭합니다.","inputData":{"email":"test@example.com","password":"longpass"}}
// unknown action: {"description":"비밀번호 입력란에 'longpass'를 입력하고, 비밀번호 확인란에도 동일한 값을 입력합니다.","inputData":{"confirmPassword":"longpass"}}
// unknown action: {"description":"회원가입 폼을 클릭하여 인증 메시지가 표시됩니다. 이메일 주소를 확인하고, 인증 코드를 입력합니다.","inputData":{"phoneNumber":"+1234567890","verificationCode":"1234"}}
// unknown action: {"description":"인증 코드가 올바르게 입력되면 회원 가입이 완료됩니다."}
});


test("중복 이메일 불가 테스트", async ({ page }) => {
// unknown action: {"description":"회원가입 폼을 클릭합니다.","inputData":{"email":"test@example.com"}}
// unknown action: {"description":"비밀번호 입력란에 'longpass'를 입력하고, 비밀번호 확인란에도 동일한 값을 입력합니다.","inputData":{"confirmPassword":"longpass"}}
// unknown action: {"description":"회원가입 폼을 클릭하여 인증 메시지가 표시됩니다. 이메일 주소를 확인하고, 인증 코드를 입력합니다.","inputData":{"phoneNumber":"+1234567890","verificationCode":"1234"}}
// unknown action: {"description":"이미 존재하는 이메일을 다시 사용하려고 시도합니다. 이전에 입력한 이메일 주소가 이미 사용되어 회원 가입이 실패합니다."}
});


test("이메일 필수 테스트 (2)", async ({ page }) => {
// unknown action: {"description":"회원가입 폼을 클릭합니다.","inputData":{}}
});


test("비밀번호 최소 8자 이상 테스트 (3)", async ({ page }) => {
// unknown action: {"description":"회원가입 폼을 클릭합니다.","inputData":{"email":"test@example.com"}}
// unknown action: {"description":"비밀번호 입력란에 'shortpass'를 입력하고, 비밀번호 확인란에도 동일한 값을 입력합니다.","inputData":{"confirmPassword":"shortpass"}}
// unknown action: {"description":"회원가입 폼을 클릭하여 인증 메시지가 표시됩니다. 이메일 주소를 확인하고, 인증 코드를 입력합니다.","inputData":{"phoneNumber":"+1234567890","verificationCode":"1234"}}
// unknown action: {"description":"이미 존재하는 이메일을 다시 사용하려고 시도합니다. 비밀번호가 최소 8자 이상이 아닙니다."}
});


test("전화번호 인증 필요 테스트 (2)", async ({ page }) => {
// unknown action: {"description":"회원가입 폼을 클릭합니다.","inputData":{"email":"test@example.com"}}
// unknown action: {"description":"비밀번호 입력란에 'longpass'를 입력하고, 비밀번호 확인란에도 동일한 값을 입력합니다.","inputData":{"confirmPassword":"longpass"}}
// unknown action: {"description":"회원가입 폼을 클릭하여 인증 메시지가 표시됩니다. 이메일 주소를 확인하고, 인증 코드를 입력하지 않습니다.","inputData":{}}
// unknown action: {"description":"이미 존재하는 이메일을 다시 사용하려고 시도합니다. 비밀번호와 전화번호 인증이 필요합니다."}
});


test("중복 이메일 불가 테스트 (2)", async ({ page }) => {
// unknown action: {"description":"회원가입 폼을 클릭합니다.","inputData":{"email":"test@example.com"}}
// unknown action: {"description":"비밀번호 입력란에 'longpass'를 입력하고, 비밀번호 확인란에도 동일한 값을 입력합니다.","inputData":{"confirmPassword":"longpass"}}
// unknown action: {"description":"회원가입 폼을 클릭하여 인증 메시지가 표시됩니다. 이메일 주소를 확인하고, 인증 코드를 입력하지 않습니다.","inputData":{}}
// unknown action: {"description":"이미 존재하는 이메일을 다시 사용하려고 시도합니다. 이미 존재하는 이메일입니다."}
});

