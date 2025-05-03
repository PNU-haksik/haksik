// src/components/LoginForm.tsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type LoginFormProps = {
  onLogin: (username: string, password: string) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={Yup.object({
        username: Yup.string().required("아이디를 입력하세요."),
        password: Yup.string().required("비밀번호를 입력하세요."),
      })}
      onSubmit={(values) => {
        onLogin(values.username, values.password);
      }}
    >
      <Form>
        <div>
          <label htmlFor="username">아이디</label>
          <Field name="username" type="text" />
          <ErrorMessage name="username" component="div" />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" component="div" />
        </div>
        <button type="submit">로그인</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
