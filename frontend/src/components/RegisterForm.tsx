import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type Props = {
  onRegister: (username: string, password: string) => void;
};

const RegisterForm: React.FC<Props> = ({ onRegister }) => (
  <Formik
    initialValues={{ username: "", password: "", confirm: "" }}
    validationSchema={Yup.object({
      username: Yup.string().required("아이디를 입력하세요."),
      password: Yup.string().min(6, "6자 이상 입력").required("비밀번호를 입력하세요."),
      confirm: Yup.string()
        .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다.")
        .required("비밀번호 확인을 입력하세요."),
    })}
    onSubmit={values => onRegister(values.username, values.password)}
  >
    <Form>
      <div>
        <label htmlFor="username">아이디</label>
        <Field name="username" />
        <ErrorMessage name="username" component="div" />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <Field name="password" type="password" />
        <ErrorMessage name="password" component="div" />
      </div>
      <div>
        <label htmlFor="confirm">비밀번호 확인</label>
        <Field name="confirm" type="password" />
        <ErrorMessage name="confirm" component="div" />
      </div>
      <button type="submit">회원가입</button>
    </Form>
  </Formik>
);

export default RegisterForm;