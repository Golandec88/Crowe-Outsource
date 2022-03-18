import Generator from "@forms/generator";
import formRules from "@utils/validation-rules";
import proptypes from "prop-types";

export default function UserInfo({ form }) {
  return <>

    <Generator schema={[
      {
        cols: 6,
        child: [{
          type: "title",
          props: {
            text: "Информация о пользователе:",
            size: "small"
          }
        }, {
          type: "text",
          props: {
            name: "request.companyInfo.director[0]",
            label: "Имя",
            fullWidth: true,
            rules: [formRules.required],
            value: form?.request.companyInfo.director.split(" ")[0]
          }
        }, {
          type: "text",
          props: {
            name: "request.companyInfo.director[1]",
            label: "Фамилия",
            rules: [formRules.required],
            fullWidth: true,
            value: form?.request.companyInfo.director.split(" ")[1]
          }
        }, {
          type: "text",
          props: {
            name: "request.companyInfo.director[2]",
            label: "Отчество",
            rules: [formRules.required],
            fullWidth: true,
            value: form?.request.companyInfo.director.split(" ")[2]
          }
        }, {
          type: "text",
          props: {
            name: "passportData.pinfl",
            label: "ИНН / ПИНФЛ физ. лица",
            rules: [formRules.required],
            fullWidth: true,
            value: form?.passportData.pinfl
          }
        }]
      },
      {
        cols: 6,
        child: [{
          type: "title",
          props: {
            text: "Серия и номер пасспорта:",
            size: "small",
          }
        }, {
          type: "text",
          props: {
            name: "passport",
            label: "Серия и номер",
            rules: [formRules.required],
            value: form?.passportData.serialAndNumber,
            fullWidth: true
          }
        },
        {
          type: "text",
          props: {
            name: "givenPlace",
            label: "Кем выдано",
            rules: [formRules.required],
            value: form?.passportData.givenPlace,
            fullWidth: true
          }
        },
        {
          type: "date",
          props: {
            name: "dateOfBirth",
            label: "Дата рождения",
            rules: [formRules.required],
            fullWidth: true
          }
        }, {
          type: "date",
          cols: 6,
          props: {
            name: "passportDateFrom",
            label: "Срок (от)",
            rules: [formRules.required],
            fullWidth: true
          }
        }, {
          type: "date",
          cols: 6,
          props: {
            name: "passportExpireDate",
            label: "Срок (до)",
            rules: [formRules.required],
            fullWidth: true
          }
        }]
      },
      {
        cols: 12,
        child: [{
          type: "text",
          props: {
            name: "address",
            cols: 12,
            label: "Адрес прописки",
            value: form?.passportData.registration,
            fullWidth: true
          }
        }, {
          type: "text",
          cols: 6,
          props: {
            name: "phone",
            label: "Телефон",
            rules: [formRules.required],
            value: form?.request.phone,
            fullWidth: true
          },
        }, {
          type: "text",
          cols: 6,
          props: {
            name: "email",
            label: "EMail",
            rules: [formRules.required],
            value: form?.request.email,
            fullWidth: true
          }
        }]
      }
    ]}/>
  </>;
}

UserInfo.propTypes = {
  form: proptypes.object
};
