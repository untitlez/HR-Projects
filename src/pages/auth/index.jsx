import { useNavigate } from "react-router-dom";

import { Form, notification } from "antd";
import { useActionStore } from "../../store/store";
import { loginItem } from "./constants/loginItem";
import { accounts } from "./constants/accountData";

import { ButtonLogin } from "../../components/auth/ButtonLogin";

export const LoginForm = () => {
  const [api, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { setLoading, setDisabled } = useActionStore();

  const adminAccount = () => form.setFieldsValue(accounts.admin);
  const employeeAccount = () => form.setFieldsValue(accounts.employee);
  const setStatusAction = (status) => {
    setLoading(status);
    setDisabled(status);
  };

  const onLogin = () => {
    setStatusAction(true);

    setTimeout(() => {
      switch (form.getFieldValue("role")) {
        case "admin":
          navigate("/admin");
          setStatusAction(false);
          break;
        case "employee":
          navigate("/employee");
          setStatusAction(false);
          break;

        default:
          api.error({
            message: "Login failed",
            description:
              "Please check your credentials and select an available account",
          });
          setStatusAction(false);
      }
    }, 3000);
  };

  return (
    <>
      {contextHolder}
      <Form
        name="login"
        form={form}
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
      >
        {loginItem.map((item) => (
          <Form.Item key={item.name} name={item.name} rules={item.rules}>
            {item.input}
          </Form.Item>
        ))}
        <ButtonLogin
          onLogin={onLogin}
          adminAccount={adminAccount}
          employeeAccount={employeeAccount}
        />
      </Form>
    </>
  );
};
